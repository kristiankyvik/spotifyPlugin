var xhr=new XMLHttpRequest();
var link= document.querySelector('input').value;
xhr.open('GET', "https://api.spotify.com/v1/tracks/"+link);
xhr.setRequestHeader('Accept', 'application/json'); //why accept

 var response=null;

var audio=document.getElementById('audio');
var progress=document.querySelector("progress")
var dashboard=document.querySelector('.widget');

xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log('onreadystatechange response', response);
          insertUrl(response,audio);
        }
      }
    };

var insertUrl= function(response,audio){
var link  = response.preview_url;
audio.setAttribute('src', link);
}

dashboard.addEventListener('click', function (evt){
  if(evt.target.className==="btn-play disabled"){
    audio.play();
    evt.target.classList.add("playing");
    setInterval(function(){
      setProgress(audio,progress);
    },500);
  }else if(evt.target.className==="btn-play disabled playing"){
    audio.pause();
    evt.target.classList.remove("playing");
  }

});

var setProgress=function(audio,progress){
  var ratio=30/audio.duration;
  var progressValue=Math.floor(ratio*audio.currentTime);
  progress.value=progressValue;
}

xhr.send();



    // send the request

    // for sending JSON data through a POST request, you can do:
    //
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(dataObject));