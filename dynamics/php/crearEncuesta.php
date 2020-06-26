<?php
include("config.php");
$conexion = conectarBD();
session_start();

function getFecha($fechaMal) {
    $fecha = str_replace("T", " ", $fechaMal);
    $fecha .= ":00";
    return $fecha;
}

$titulo = mysqli_real_escape_string($conexion, $_POST["titulo"]);
$descripcion = mysqli_real_escape_string($conexion,$_POST["descripcion"]);
$categoria = mysqli_real_escape_string($conexion,$_POST["categoria"]);
if($categoria == 0) {
    $categoria = "null";
}
$fechaIni = getFecha($_POST["fIni"]);
$fechaFin = getFecha($_POST["fFin"]);
$minUser = $_POST['minUser'];
if(isset($_POST['grupo'])) {
    $grupo = $_POST['grupo'];
}
if($grupo == 0) {
    $grupo = "null";
}

$idEncuesta = $_SESSION["idUser"]."-".($_SESSION["generadas"]+1);
$l = 0;
$arrIdPreguntas = ["null","null","null","null","null"];
$arrIdRespuestasImg = [];
for ($i=1; $i < 6; $i++) {
    $arrIdRespuestas = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    if(isset($_POST["pregunta".$i])) {
        $idPregunta = $idEncuesta."Q".$i;
        $arrIdPreguntas[$l] = '"'.$idPregunta.'"';
        $l++;
        $valorPregunta = mysqli_real_escape_string($conexion, $_POST["pregunta".$i]);
        for ($k=0; $k < 10; $k++) {
            if(isset($_POST["respuesta".$i][$k])) {
                $idRespuesta = $idPregunta."R".$k;
                array_push($arrIdRespuestasImg, $idRespuesta);
                $valorRespuesta = mysqli_real_escape_string($conexion, $_POST["respuesta".$i][$k]);
                $arrIdRespuestas[$k] = '"'.$idRespuesta.'"';
                $consulta = 'INSERT INTO respuesta (id_Respuesta, Respuesta) VALUES ("'.$idRespuesta.'", "'.$valorRespuesta.'")';
                $consultar = mysqli_query($conexion, $consulta);
            }
        }
        $consulta = 'INSERT INTO pregunta VALUES ("'.$idPregunta.'", "'.$valorPregunta.'", '.$arrIdRespuestas[0].', '.$arrIdRespuestas[1].', '.$arrIdRespuestas[2].', '.$arrIdRespuestas[3].', '.$arrIdRespuestas[4].', '.$arrIdRespuestas[5].', '.$arrIdRespuestas[6].', '.$arrIdRespuestas[7].', '.$arrIdRespuestas[8].', '.$arrIdRespuestas[9].')';
        $consultar = mysqli_query($conexion, $consulta);
    }
}

$consulta = 'INSERT INTO encuesta VALUES ("'.$idEncuesta.'", "'.$titulo.'", "'.$descripcion.'", '.$categoria.', "'.$fechaIni.'", "'.$fechaFin.'", '.$arrIdPreguntas[0].', '.$arrIdPreguntas[1].', '.$arrIdPreguntas[2].', '.$arrIdPreguntas[3].', '.$arrIdPreguntas[4].', '.$minUser.', '.$grupo.')';
$consultar = mysqli_query($conexion, $consulta);

$_SESSION["generadas"]++;
$consulta = 'UPDATE usuario SET EncuCreadas = '.$_SESSION["generadas"].' WHERE id_usuario = '.$_SESSION["idUser"].'';
$consultar = mysqli_query($conexion, $consulta);

for ($i=0; $i < 5; $i++) {
    if($_FILES["imgQuest"]["type"][$i] == "image/png" || $_FILES["imgQuest"]["type"][$i] == "image/jpg" || $_FILES["imgQuest"]["type"][$i] == "image/jpeg") {
        $dir = '../../statics/img/fotosQuest';
        $temporal = $_FILES["imgQuest"]["tmp_name"][$i];
        $extension = pathinfo($_FILES["imgQuest"]["name"][$i], PATHINFO_EXTENSION);
        rename($temporal, $dir."/".str_replace('"', "", $arrIdPreguntas[$i]).".".$extension);
    }
}
for ($i=0; $i < count($arrIdRespuestasImg); $i++) {
    if($_FILES["imgResp"]["type"][$i] == "image/png" || $_FILES["imgResp"]["type"][$i] == "image/jpg" || $_FILES["imgResp"]["type"][$i] == "image/jpeg") {
        $dir = '../../statics/img/fotosResp';
        $temporal = $_FILES["imgResp"]["tmp_name"][$i];
        $extension = pathinfo($_FILES["imgResp"]["name"][$i], PATHINFO_EXTENSION);
        rename($temporal, $dir."/".str_replace('"', "", $arrIdRespuestasImg[$i]).".".$extension);
    }
}

header("location: ../../templates/encuestas.html")

?>
