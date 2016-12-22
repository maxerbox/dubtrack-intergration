<?php
header('Access-Control-Allow-Origin: *');  
if(!isset($_GET['type']) && !isset($_GET['type']))
throw new Exception("Invalid parameters");
switch($_GET['type']) {
case "room":
echo room($_GET['id']);
break;
case "current":
echo CurrentSong($_GET['id']);
break;
case "song":
echo song($_GET['id']);
break;
default:
throw new Exception("Invalid type");
}
function room($id) {
return file_get_contents("https://api.dubtrack.fm/room/".$id);
}
function Active($hash_id) {
return file_get_contents("https://api.dubtrack.fm/room/".$hash_id."/playlist/active");
}
function song($id) {
return file_get_contents("https://api.dubtrack.fm/song/".$id);
}
function CurrentSong($id) {
return Active($id);
/*
$json = json_decode(room($id));

if ($json == null)
throw new Exception("Error on parsing JSON ! MAYBE THE SCRIPT IS OUT OF DATE !");
return Active($json->data->_id);
*/
}
?>