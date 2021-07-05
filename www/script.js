document.querySelectorAll('.links a').forEach(item => {
  item.addEventListener('click', event => {
    document.getElementsByClassName("active")[0].classList = [];
    item.classList = ["active"];
    var link = item.getAttribute("href");
    if(link == "#now"){
      now();
    }else if(link == "#link1"){
      link1();
    }else if(link == "#link2"){
      link2();
    }else if(link == "#settings"){
      settings();
    }
  })
})

document.getElementById("save").addEventListener("click", save_settings);


function next(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    update_now_playing();
  }
  xhttp.open("PUT", "/api/next");
  xhttp.send();
}
function prev(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    update_now_playing();
  }
  xhttp.open("PUT", "/api/prev");
  xhttp.send();
}

document.querySelectorAll('.buttons div').forEach(item => {
  item.addEventListener('click', event => {
    var event = item.classList[0];
    if(event == "prev"){
      prev();
    }else if(event == "next"){
      next();
    }else if(event == "pause"){
      pause();
    }else if(event == "play"){
      play();
    }
  })
})

function hide(){
  document.getElementsByClassName("now")[0].style.display = "none";
  document.getElementsByClassName("settings")[0].style.display = "none";
}

function statePaused(){
  var btn = document.getElementsByClassName("pause");
  if(btn.length == 1){
    btn[0].classList = ["play"];
  }
}
function statePlaying(){
  var btn = document.getElementsByClassName("play");
  if(btn.length == 1){
    btn[0].classList = ["pause"];
  }
}

function play(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    statePlaying();
  }
  xhttp.open("PUT", "/api/play");
  xhttp.send();
}
function pause(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    statePaused();
  }
  xhttp.open("PUT", "/api/pause");
  xhttp.send();

}

function update_now_playing(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var jsonObj = JSON.parse(this.responseText);
    var track = jsonObj["track"];
    var artist = jsonObj["artist"];
    if(jsonObj["status"] == "playing"){
      statePlaying();
    }else if(jsonObj["status"] == "paused"){
      statePaused();
    }
    document.getElementsByClassName("track")[0].innerHTML = track;
    document.getElementsByClassName("artist")[0].innerHTML = artist;
  }
  xhttp.open("GET", "/api/playing");
  xhttp.send();
}

function get_settings(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var settings = JSON.parse(this.responseText);
    document.getElementById("bitrate").value = settings["bitrate"];
    device_name = document.getElementById("device_name").value = settings["device_name"];
  }
  xhttp.open("GET", "/api/settings");
  xhttp.send();
}

function save_settings(){
  var bitrate = document.getElementById("bitrate").value;
  var device_name = document.getElementById("device_name").value;

  var payload = `{"bitrate": "${bitrate}", "device_name": "${device_name}"}`;

  var xhttp = new XMLHttpRequest();
// TODO: ADD CONFIRMATION POPUP
//  xhttp.onload = function() {
//  }
  xhttp.open("PUT", "/api/settings");
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(payload);
}

function now(){
  hide();
  update_now_playing();
  document.getElementsByClassName("now")[0].style.display = "table";
}

function link1(){
  hide();
}

function link2(){
  hide();
}

function settings(){
  get_settings();
  hide();
  document.getElementsByClassName("settings")[0].style.display = "block";
}

now();
