const countdown = () =>
{
  let count = 10;
  let countNum = document.getElementById("countdown");

  let downloadTimer = setInterval(function(){
    if(count < 0){
      clearInterval(downloadTimer);
      document.getElementById("canvas").style = "border: 5px solid yellow;"
      countNum.style.visibility = "collapse";
    }
    countNum.textContent = "Please get ready. Recording will start in: " + count;
    count --;
  }, 1000);

}

module.exports = countdown;