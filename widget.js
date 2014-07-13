var link=document.querySelector('input').value;
var response=null;
var audio=document.getElementById('audio');
var progress=document.querySelector("progress");
var dashboard=document.querySelector('.widget');
var results=document.querySelector("#results");

var loadAudio = function (link){
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/tracks/"+link);
  xhr.setRequestHeader('Accept', 'application/json'); //why accept

  xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          audio.setAttribute('src', response.preview_url);
          document.querySelector(".metadata .title").textContent=response.name;
          document.querySelector(".metadata .author").textContent=response.artists[0].name;
          audio.play();
          document.querySelector('.btn-play').classList.add("playing");
        }
      }
    };
    xhr.send();
};

loadAudio(link);

var loadSearch=function(link){
  var xhr =new XMLHttpRequest();
  xhr.open('GET', "https://api.spotify.com/v1/search/?q="+link);
  xhr.setRequestHeader('Accept', 'application/json');
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

var setProgress=function(audio,progress){
  var ratio=30/audio.duration;
  var progressValue=Math.floor(ratio*audio.currentTime);
  progress.value=progressValue;
}

document.addEventListener('submit', function (evt){
    if(evt.target.id==='track'){
      evt.preventDefault();
      link= document.querySelector('input').value;
      loadAudio(link);

    }

    else if(evt.target.id==='search'){
      evt.preventDefault();
      var words= evt.target.searchItem.value;
      words+="&type=track";
      link=parseSearch(words);
      loadSearch(link);
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
    a.id=object[key].id;
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
  }else if(evt.target.nodeName==="PROGRESS"){
    audio.currentTime=evt.layerX/evt.target.clientWidth*audio.duration;
  }

});

audio.addEventListener('timeupdate',function(evt){
    setProgress(audio,progress);
    if(audio.duration===audio.currentTime)
      document.querySelector(".btn-play").classList.remove("playing")
})


results.addEventListener('click',function(evt){
  evt.preventDefault();
  var selected=evt.target;
  //If the user click on the song name or author name we have to get the url from <a></a>
  if(evt.target.nodeName!=="A")
    selected=evt.target.parentNode;
  loadAudio(selected.id);
});