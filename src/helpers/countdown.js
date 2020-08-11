const countdown = () => {
  let count = 6;
  let countNum = document.getElementById("countdown");

  let downloadTimer = setInterval(function () {
    if (count < 0) {
      clearInterval(downloadTimer);
      document.getElementById("canvas").style = "border: 5px solid lime;";
      // countNum.style.visibility = "hidden";
    }
    if (count !== -1) {
      countNum.textContent = "Please get ready. Recording will start in: " + count;
    }
    count--;
  }, 950);

};

module.exports = countdown;