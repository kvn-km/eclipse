import * as tmPose from '@teachablemachine/pose';
import axios from 'axios';
import countdown from './countdown';

const URL = "http://localhost:8000/my_model/";

let model, webcam, ctx, labelContainer, maxPredictions, msgContainer;
let i = "";
const probabilityArr = [];
let count = 6;

const avg = (arr) => {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
        sum += Number(arr[j]);
    }
    return Number(sum / arr.length);
};

export async function preINIT(status, refreshPage, props, redirectPage) {

    async function init(status) {
        i = 0;
        // const modelURL = URL + "model.json";
        // const metadataURL = URL + "metadata.json";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 700;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();

        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        // ctx.drawImage(webcam.canvas, 0, 0);

        const cameraOn = () => {
            count = 6;
            let cameraTimer = setInterval(() => {
                if (count < 0) {
                    clearInterval(cameraTimer);
                }
                else {
                    window.requestAnimationFrame(looping);
                    count--;
                }
            }, 1000);
        };

        countdown();
        cameraOn();

        setTimeout(() => {
            window.requestAnimationFrame(loop);
            // }, 11000);
        }, 6500);

        // append/get elements to the DOM

        labelContainer = document.getElementById("label-container");
        msgContainer = document.getElementById("countdown");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
        if (status === "STOP") {
            await webcam.stop();
        }
    }
    init();

    async function looping(timestamp) {
        if (webcam.canvas) {
            // webcam.play();
            ctx.drawImage(webcam.canvas, 0, 0);
            webcam.update();
            window.requestAnimationFrame(looping);
        }
    }

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();

        if (i < 60) {
            window.requestAnimationFrame(loop);
            i++;
        }
        else {
            //  Checks whether average probability is enough to register pose
            if (avg(probabilityArr) >= 0.1) {

                Promise.resolve(
                    axios.put('/api/tasks/user', { params: { id: status.info.id, taskId: status.task.id, taskXP: status.task.xp, levelXP: status.levelInfo } })
                        .then(() => {
                            console.log("Updated User Tasks");
                            axios.put('/api/achievs', { params: { id: status.info.id, taskId: status.task.id } })
                                .then(() => {
                                    document.getElementById("countdown").textContent = "Completed! Redirecting back to tasks...";
                                    webcam.stop();
                                    document.getElementById("countdown").style.visibility = "visible";
                                    // TIMEOUT SO NOT JARRING
                                    setTimeout(() => {
                                        redirectPage(props);
                                    }, 1500);
                                    console.log("Redirected back to Main tasks page");
                                });
                        }))
                    .catch(e => console.log("ERROR: ", e));
            }
            else {
                document.getElementById("countdown").textContent = "Incomplete! Please Try Again. Redirecting back to tasks...";
                webcam.stop();
                // document.getElementById("countdown").style.visibility = "visible";
                setTimeout(() => {
                    redirectPage(props);
                }, 2000);

            }
        }
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element

        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        //Task name on the task page
        let taskTitle = document.getElementsByClassName('task-title')[0].textContent;

        for (let i = 0; i < maxPredictions; i++) {
            //
            if (taskTitle.includes(prediction[i].className)) {
                // const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(1) * 100 + "% Match";

                probabilityArr.push(prediction[i].probability.toFixed(2));
                document.getElementById("countdown").textContent = prediction[i].probability.toFixed(1) * 100 + "% Match";
                // labelContainer.childNodes[i].innerHTML = classPrediction;
                // document.getElementsByClassName('task-title')[0].textContent = classPrediction;
            }
        }

        // finally draw the poses; shows webcam

        drawPose(pose);
    }

}





async function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}
