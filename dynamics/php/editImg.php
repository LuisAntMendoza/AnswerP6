<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//recibe una imagen y la renombra segun el caso de si es pregunta o respuesta y la agrega a su correspondiente directorio
foreach ($_FILES as $key => $value) {
    if($value["type"] == "image/png" || $value["type"] == "image/jpg" || $value["type"] == "image/jpeg") {
        if (preg_match("/^\d+-\d+Q[1-5]R[0-9]$/", $key)) {
            $dir = '../../statics/img/fotosResp';
            $temporal = $value["tmp_name"];
            $extension = pathinfo($value["name"], PATHINFO_EXTENSION);
            rename($temporal, $dir."/".$key.".".$extension);
        }else {
            $dir = '../../statics/img/fotosQuest';
            $temporal = $value["tmp_name"];
            $extension = pathinfo($value["name"], PATHINFO_EXTENSION);
            rename($temporal, $dir."/".$key.".".$extension);
        }
    }
}
header("location: ../../templates/editarEncuestas.html");


?>
