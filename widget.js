var xhr=new XMLHttpRequest();
var link= document.querySelector('input').value;
xhr.open('GET', "https://api.spotify.com/v1/tracks/"+link);
xhr.setRequestHeader('Accept', 'application/json'); //why accept

 var response=null;


xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          response = JSON.parse(this.response);
          console.log('onreadystatechange response', response);
          insertUrl(response);
        }
      }
    };

var insertUrl= function(response){
  var link  = response.preview_url;
  var audio=document.getElementById('audio');
  audio.setAttribute('src', link);
}
var audio=document.getElementById('audio');
var dashboard=document.querySelector('.widget');
dashboard.addEventListener('click', function (evt){
  if(evt.target.className==="btn-play disabled playing"){
    audio.play();
    evt.target.classList.remove("playing");
  }else if(evt.target.className==="btn-play disabled "){
    audio.pause();
    evt.target.classList.add("playing");
  }

});

xhr.send();



    // send the request

    // for sending JSON data through a POST request, you can do:
    //
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(dataObject));