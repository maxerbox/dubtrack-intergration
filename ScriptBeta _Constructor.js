// Maxerbox 2015-2016
// DUBTRACK PLAYER
// Create CANVAS

/*var div = document.createElement('div');
select.setAttribute("id", "mxb_player"); */
console.log("Dubtrack Player By MaxerBox");
if (Dubtrack_isset())
Explode_dubtrack();
else
Build_dubtrack();
function Dubtrack_isset() {
var check = document.getElementById("youtube_dubtrackfm");
if (check != null) {
return true;} 
else {return false;}
}
function Build_dubtrack() {

if (Dubtrack_isset())
throw new Error("Player is already started");
var select = document.createElement('select');
select.setAttribute("id", "dubtrackfm_select");
select.setAttribute("onchange", "dubtrack_Onselect(this);");
select.setAttribute("style", "width: 300px; position: fixed; bottom: 201px; right: 0; z-index: 2000; border: 1px solid #000;  font-size: 14px;  color: #fff;  background: #444;  padding: 5px;");
var opt = document.createElement('option');
    opt.value = "nightblue3";
    opt.innerHTML = "nightblue3 (Waiting for room)";
    select.appendChild(opt);
document.body.appendChild(select);
var y = document.createElement('iframe');
y.setAttribute("id", "youtube_dubtrackfm");
y.setAttribute("frameborder", "0");
y.setAttribute("src", "https://www.quarpro.com/media/ajax_wait.gif");
y.setAttribute("width", "300");
y.setAttribute("height", "100");
y.setAttribute("style", "position: fixed; bottom: 100px; right: 0; z-index: 2000;");
document.body.appendChild(y);
var c = document.createElement('canvas');
c.setAttribute("id", "mon_canvas");
c.setAttribute("width", "300");
c.setAttribute("height", "100");
c.setAttribute("style", "position: fixed; bottom: 0; right: 0; z-index: 2000;");
document.body.appendChild(c);
}
function Explode_dubtrack() {
if (!Dubtrack_isset())
throw new Error("Already removed");
select = document.getElementById("dubtrackfm_select");
y = document.getElementById("youtube_dubtrackfm");
c = document.getElementById("mon_canvas");
document.body.removeChild(select);
document.body.removeChild(y);
document.body.removeChild(c);
}
GetRooms("dubtrackfm_select");
// END Create
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

function dubtrack_Onselect(element) {
Dubtrack_Loading();
var index = element.selectedIndex;
var value = element.options[index].value;
id = value;
GetInfoRoom();
}

function Select_Error(select_id,message) {

var select = document.getElementById(select_id);
var length = select.options.length;
var ErrorObj  = document.createElement('option');
    ErrorObj.value = "Error";
    ErrorObj.innerHTML = message;
    select.appendChild(ErrorObj);
    select.selectedIndex = length;
    console.error(message);
}
function Dubtrack_Loading() {
roomname= "Waiting...";
currentsongname = "Waiting...";
var iframe = document.getElementById("youtube_dubtrackfm");
iframe.src = "https://www.quarpro.com/media/ajax_wait.gif";
}
function GetRooms(select_id) {
//clear select
document.getElementById(select_id).innerHTML = "";

var select = document.getElementById(select_id)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      SetRoomList(xhttp.responseText,select_id);
    } 
    
  };
  xhttp.open("GET", "dubtrack/roomlist.php", true);
  xhttp.send();

}
function SetRoomList(data, select_id) {
var json = JSON.parse(data)
var code;
try {
code = json.code;
}
catch (err) {
Select_Error(select_id,err);
}
if (code != null && code == 200) {
for (i = 0; i < json.room.length; i++) { 
    var select = document.getElementById(select_id);
    var opt = document.createElement('option');
    opt.value = json.room[i];
    opt.innerHTML = json.room[i];
    select.appendChild(opt);
}
} else {
Select_Error(select_id,"Oups something is wrong with the server");
}
}

function GetInfoRoom() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      Requested(xhttp.responseText);
    }
  };
  xhttp.open("GET", "dubtrack/get.php?type=room&id=" + id, true);
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
  yhttp.open("GET", "dubtrack/get.php?type=current&id=" + roomid, true);
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
console.log("FK ID = " + fk);
var start = json.data.startTime;
document.getElementById('youtube_dubtrackfm').src = "http://www.youtube.com/embed/" + fk + "?autohide=1&amp;autoplay=1&amp;html5=1&amp;fs=0&amp;showinfo=0&amp;controls=0&amp;start=" + start;
}

function Requested(source) {
 var json = JSON.parse(source);
  var songid;

try {songid = json.data.currentSong.songid; roomid = json.data._id;}
catch(err) {songid = undefined;   }

 if (typeof songid != 'undefined') {

 //alert(songid + "/" + LastSongId);
 if (songid != LastSongId) {
   console.log("ROOM ID = " + roomid);
  console.log("NEW SONG ID = " + songid);
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
  xhttp.open("GET", "dubtrack/get.php?type=song&id=" + id, false);
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