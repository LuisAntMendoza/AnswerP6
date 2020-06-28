<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//recibe un nombre y te devuelve la extension de esa foto (respuestas)
$idEncuesta = $_POST['nomResp'];
$response = [];
for ($i=0; $i < 5; $i++) {
    for ($k=0; $k < 10; $k++) {
        $nombre = $idEncuesta.($i+1)."R".($k);
        $ext = "";
        if(file_exists("../../statics/img/fotosResp/".$nombre.".png")) {
            $ext = "png";
        }
        elseif (file_exists("../../statics/img/fotosResp/".$nombre.".jpg")) {
            $ext = "jpg";
        }
        elseif (file_exists("../../statics/img/fotosResp/".$nombre.".jpeg")) {
            $ext = "jpeg";
        }else {
            $ext = "null";
        }
        array_push($response, $ext);
    }
}
echo json_encode($response);

?>
