const countdown = () =>
{
  let count = 10;
  let countNum = document.getElementById("countdown");

  let downloadTimer = setInterval(function(){
    if(count < 0){
      clearInterval(downloadTimer);
      countNum.style.visibility = "collapse";
    }
    countNum.textContent = "Please get ready. Camera will start in: " + count;
    count --;
  }, 1000);

}

module.exports = countdown;