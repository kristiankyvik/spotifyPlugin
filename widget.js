var link=document.querySelector('input').value;
var response=null;

var audio=document.getElementById('audio');
var progress=document.querySelector("progress");
var dashboard=document.querySelector('.widget');


var load = function (link, prefix){
  console.log(link);
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/"+prefix+link);
  xhr.setRequestHeader('Accept', 'application/json'); //why accept


  xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log('onreadystatechange response', response);
          insertUrl(response,audio);
          audio.play();
          document.querySelector('.btn-play').classList.add("playing");
        }
      }
    };


    xhr.send();
};


load(link, "tracks/");



var insertUrl= function(response,audio){
link  = response.preview_url;
audio.setAttribute('src', link);
}


var parseSearch=function(query){

};

document.addEventListener('submit', function (evt){
    console.log(evt);
    if(evt.target.id==='track'){
      evt.preventDefault();
      link= document.querySelector('input').value;
      load(link, "tracks/" );

    }

    else if(evt.target.id==='searchItem'){
      evt.preventDefault();
      var words= document.querySelector('#searchItem').value;
      
      var wordsArray=words.split(" ");
      console.log(wordsArray);

      // load(link, ""):



    }


  

});





dashboard.addEventListener('click', function (evt){
  if(evt.target.className==="btn-play disabled"){
    audio.play();
    evt.target.classList.add("playing");
    
  }else if(evt.target.className==="btn-play disabled playing"){
    audio.pause();
    evt.target.classList.remove("playing");
  }

});

audio.addEventListener('timeupdate',function(evt){
    setProgress(audio,progress);
})

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