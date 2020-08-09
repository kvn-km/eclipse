import * as tmPose from '@teachablemachine/pose';
import axios from 'axios';
import countdown from './countdown'

const URL = "http://localhost:8000/my_model/";

let model, webcam, ctx, labelContainer, maxPredictions;
let i = "";
const probabilityArr = [];
let count = 10;

const avg = (arr) => {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
        sum += Number(arr[j]);
    }
    return Number(sum / arr.length);
};

export async function preINIT(stuff, refreshPage, props, redirectPage) {

    async function init(stuff) {
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
        countdown();
        await webcam.play();
        setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, 11000);


        console.log(probabilityArr);
        console.log(avg(probabilityArr));

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
        if (stuff === "STOP") {
            await webcam.stop();
        }
    }
    init();

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();

        if (i < 100) {
            window.requestAnimationFrame(loop);
            i++;
        }
        else {
            //  Checks whether average probability is enough to register pose
            // if (avg(probabilityArr) >= 0.1) {

            Promise.resolve(
                axios.put('/api/tasks/user', { params: { id: stuff.info.id, taskId: stuff.task.id, taskXP: stuff.task.xp, levelXP: stuff.levelInfo } })
                    .then(() => {
                        console.log("ERERERERERERERERERE");
                        axios.put('/api/achievs', { params: { id: stuff.info.id, taskId: stuff.task.id } })
                            .then(() => {
                                webcam.stop();
                                // TIMEOUT SO NOT JARRING
                                setTimeout(() => {
                                    redirectPage(props);
                                }, 1500);
                                console.log("HERERERERERERERER");
                            });
                    }))
                .catch(e => console.log("ERRORRRR", e));
            // }
        }
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        //Task name on the task page
        let taskTitle = document.getElementsByClassName('task-title')[0].innerHTML;

        for (let i = 0; i < maxPredictions; i++) {

            //
            if (taskTitle === prediction[i].className) {
                const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);

                probabilityArr.push(prediction[i].probability.toFixed(2));
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }

        // finally draw the poses; shows webcam
        drawPose(pose);
    }

}





function drawPose(pose) {
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
