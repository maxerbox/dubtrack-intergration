//CANVAS
var can = document.getElementById("mon_canvas");
var ctx = can.getContext("2d");
ctx.fillStyle = "grey";
//END CANVAS
//FONT
ctx.fillRect(0, 0, can.width, can.height);
//CANVAS
var can = document.getElementById("mon_canvas");
var ctx = can.getContext("2d");
ctx.fillStyle = "grey";
//END CANVAS
//FONT
ctx.fillRect(0, 0, can.width, can.height);
//DEFIL VARS
var roomname= "Waiting...",currentsongname = "Waiting...";
var step = 0;
var delay= 30;
//END DEFIL VARS

//TEST 
//var audio = new Audio();
//END TEST
var LastSongId = "";
var id;
var roomid;
var params = getSearchParameters();
if (typeof params.id != 'undefined') {
id = params.id;
} else {id = "nightblue3";}

setInterval(Defile,delay);
GetInfoRoom();

var RoomInterval = setInterval(GetInfoRoom,5000);




function GetInfoRoom() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      Requested(xhttp.responseText);
    }
  };
  xhttp.open("GET", "http://api-dubtrack.nodilex.io/index.php?id=" + id, true);
  xhttp.send();
}
function GetInfosCurrentMusic() {
if (typeof roomid != 'undefined') {
  var yhttp = new XMLHttpRequest();
  yhttp.onreadystatechange = function() {
    if (yhttp.readyState == 4 && yhttp.status == 200) {
      MusicRequested(yhttp.responseText);
    }
  };
  yhttp.open("GET", "http://api-dubtrack.nodilex.io/index3.php?id=" + roomid, true);
  yhttp.send();
  }
}
function MusicRequested(source) {
var json = JSON.parse(source);
var code;
try {code = json.code;} catch(err) {code = 404;}
if (code != 404) {
SetYoutube(json);


}
}
function SetYoutube(json) {

var fk = json.data.songInfo.fkid;
var start = json.data.startTime;
document.getElementById('youtube').src = "http://www.youtube.com/embed/" + fk + "?autohide=1&amp;autoplay=1&amp;html5=1&amp;fs=0&amp;showinfo=0&amp;controls=0&amp;start=" + start;
}

function Requested(source) {
 var json = JSON.parse(source);
  var songid;
  roomid = json.data._id;
try {songid = json.data.currentSong.songid;}
catch(err) {songid = undefined;}

 if (typeof songid != 'undefined') {
 //alert(songid + "/" + LastSongId);
 if (songid != LastSongId) {
 GetInfosCurrentMusic();
 LastSongId = songid;
if (songid != typeof undefined) {
jsonMusic = JSON.parse(GetInfoSong(json.data.currentSong.songid));
//if (json.data.currentSong.type == "youtube") {
// var fk = jsonMusic.data.fkid;
// if (!audio.paused) {audio.pause;}

//audio = new Audio("http://www.youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v="+fk);
//audio.load();
//audio.play();
//}
var image = new Image();
var Urlimg;
try {
 Urlimg = jsonMusic.data.images.youtube.medium.url;}
catch(err) {Urlimg = undefined;}
if (typeof Urlimg != 'undefined') {
image.src = jsonMusic.data.images.youtube.medium.url; } else {
image.src = 'http://www.funandgames.fr/data/avatars/l/0/92.jpg?1444329381'; }

image.onload = function() {
  // Cette fonction est appelée lorsque l'image a été chargée
  ctx.drawImage(this,0,-10); // this fait référence à l'objet courant (=image)
  RefreshInfos(json);
};
} else {RefreshInfos(json);}

}}




  
}

function RefreshInfos(json) {

try{currentsongname=json.data.currentSong.name;} catch(err){currentsongname="No songs playing";
clearInterval(RoomInterval);
}

try{roomname="Room: " + json.data.name;} catch(err){roomname= "Room: " + "Not found or error";
}


}
function Defile() {
step++;

ctx.clearRect(0, 0, can.width, 18);
ctx.fillStyle = "grey";

ctx.fillRect(0, 0, can.width, 18);

ctx.clearRect(0, can.height - 18, can.width, 18);
ctx.fillRect(0, can.height - 18, can.width, 18);

ctx.font = "10pt Verdana";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillStyle = "darkorange";
ctx.fillText(currentsongname, step, 0);
ctx.fillStyle = "Gainsboro";
ctx.fillText(roomname, step, can.height - 18);
if (step > can.width) {
step = 0 - ctx.measureText(currentsongname).width;
}

}



function GetInfoSong(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://api-dubtrack.nodilex.io/index2.php?id=" + id, false);
  xhttp.send();
  return xhttp.responseText;
}
function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}