<?php
header('Access-Control-Allow-Origin: *');  
$data = array (
    "room"  => array("nightblue3","fungames","instant-hack","nightcore-reality","chilloutroom"),
    "code" => "200",
    "message"   => "Good listening"
);
$json = json_encode($data);
if ($json == false || $json == null) {
$data = array (
    "code" => "400",
    "message"   => "Internal server error: json"
);
echo json_encode($data);
} else {
echo $json;
}

?>