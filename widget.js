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
          console.log('onreadystatechange response');
          insertUrl(response,audio);
          audio.play();
          document.querySelector('.btn-play').classList.add("playing");
        }
      }
    };

    xhr.send();
};

load(link, "tracks/");

var loadSearch=function(link,prefix){
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/"+prefix+link);
  xhr.setRequestHeader('Accept', 'application/json'); //why accept
  xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log(response);
          putResults(response.tracks.items);
        }
      }
    };


  xhr.send();
};
var insertUrl= function(response,audio){
link  = response.preview_url;
audio.setAttribute('src', link);
}


var parseSearch=function(query){
  var newValue="";
  for(var i=0;i<query.length;i++){
    if(query[i]==" ")
      newValue+="%20";
    else
      newValue+=query[i];
  }
  return newValue;
};

document.addEventListener('submit', function (evt){
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
var putResults=function(object){
  var ul=document.querySelector("#results");
  //First we have to remove previous searches
  while(ul.hasChildNodes()){
    ul.removeChild(ul.firstChild);
  }
  for(var key in object){
    var artist=document.createElement("span");
    var song=document.createElement("span");
    var li=document.createElement("li");
    var a=document.createElement("a");
    artist.className="artist";
    song.className="song";
    artist.textContent=object[key].artists[0].name;
    song.textContent=object[key].name;
    a.appendChild(artist);
    a.appendChild(song);
    li.appendChild(a);
    ul.appendChild(li);
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
    if(audio.duration===audio.currentTime)
      document.querySelector(".btn-play").classList.remove("playing")
})

var setProgress=function(audio,progress){
  var ratio=30/audio.duration;
  var progressValue=Math.floor(ratio*audio.currentTime);
  progress.value=progressValue;
}
