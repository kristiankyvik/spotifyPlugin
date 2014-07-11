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
var loadSearch=function(link,prefix){
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/"+prefix+link);
  xhr.setRequestHeader('Accept', 'application/json'); //why accept
  xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log('onreadystatechange response', response);
          putResults(response.tracks.items);
        }
      }
    };


  xhr.send();
}

load(link, "tracks/");



var insertUrl= function(response,audio){
link  = response.preview_url;
audio.setAttribute('src', link);
}


var parseSearch=function(query){
  var newValue="";
  for(var i=0;i<query.length;i++){
    if(query[i]==" "){
      newValue+="%20";
    }
    else{
      newValue+=query[i];
    }
  }
  return newValue;
};

document.addEventListener('submit', function (evt){
  console.log(evt);
    if(evt.target.id==='track'){
      evt.preventDefault();
      link= document.querySelector('input').value;
      load(link, "tracks/" );

    }

    else if(evt.target.id==='search'){
      evt.preventDefault();
      var words= evt.target.searchItem.value;
      words+="&type=track";
      link=parseSearch(words);
      loadSearch(link, "search/?q=");
    }


  

});
var putResults=function(array){
  var ul=document.querySelector("ul");
  for(var i=array.length-1;i>=0;i--){
    var artist=document.createElement("span");
    var song=document.createElement("span");
    artist.className="artist";
    song.className="song";
    artist.textContent=array[i].artist[0].name;
    artist.textContent=array[i].name;
    ul.appendChild(artist);
    ul.appendChild(song);
  }
}




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