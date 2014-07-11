





var link=document.querySelector('input').value;
var response=null;

var audio=document.getElementById('audio');
var progress=document.querySelector("progress");
var dashboard=document.querySelector('.widget');


var load = function (link){
  console.log(link);
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/tracks/"+link);
  xhr.setRequestHeader('Accept', 'application/json'); //why accept


  xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log('onreadystatechange response', response);
          insertUrl(response,audio);
        }
      }
    };


    xhr.send();
};


load(link);



var insertUrl= function(response,audio){
link  = response.preview_url;
audio.setAttribute('src', link);
}



document.addEventListener('submit', function (evt){
  evt.preventDefault();
  link= document.querySelector('input').value;
  console.log(link);
  load(link);

});



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





    // send the request

    // for sending JSON data through a POST request, you can do:
    //
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(dataObject));