<?php
//iniciamos sesion y conectamos a la BD
include("config.php");
$conexion = conectarBD();
session_start();

//nos regresa una fecha con el formato para insertarla en la BD
function getFecha($fechaMal) {
    $fecha = str_replace("T", " ", $fechaMal);
    $fecha .= ":00";
    return $fecha;
}

//escapamos y validamos los valores recibidos
if(preg_match("/^(\w|\s|\?|¿|á|é|í|ó|ú|ñ)+$/", $_POST['titulo'])) {
    $titulo = mysqli_real_escape_string($conexion, $_POST["titulo"]);
}
else {
    header("location: ../../templates/inicio.html");
}
if(preg_match("/^(\w|\s|\?|¿|á|é|í|ó|ú|ñ)+$/", $_POST['descripcion'])) {
    $descripcion = mysqli_real_escape_string($conexion, $_POST["descripcion"]);
}
else {
    header("location: ../../templates/inicio.html");
}
//asignamos valores segun lo recibido
$categoria = mysqli_real_escape_string($conexion,$_POST["categoria"]);
if($categoria == 0) {
    $categoria = "null";
}
$fechaIni = getFecha($_POST["fIni"]);
$fechaFin = getFecha($_POST["fFin"]);
if(isset($_POST['minUser'])) {
    $minUser = $_POST['minUser'];
} else {
    $minUser = 4;
}
if(isset($_POST['grupo'])) {
    $grupo = $_POST['grupo'];
}
if($grupo == 0) {
    $grupo = "null";
}

//creamos los id de encuesta
$idEncuesta = $_SESSION["idUser"]."-".($_SESSION["generadas"]+1);
$l = 0;
//generamos arreglos con los id de las preguntas y las respuestas
$arrIdPreguntas = ["null","null","null","null","null"];
$arrIdRespuestasImg = [];
for ($i=1; $i < 6; $i++) {
    $arrIdRespuestas = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    if(isset($_POST["pregunta".$i])) {
        //generamos el id de pregunta y lo agregamos al arreglo
        $idPregunta = $idEncuesta."Q".$i;
        $arrIdPreguntas[$l] = '"'.$idPregunta.'"';
        $l++;
        //obtenemos la pregunta
        $valorPregunta = mysqli_real_escape_string($conexion, $_POST["pregunta".$i]);
        for ($k=0; $k < 10; $k++) {
            if(isset($_POST["respuesta".$i][$k])) {
                //genera el id de respuesta y lo agrega al arreglo
                $idRespuesta = $idPregunta."R".$k;
                array_push($arrIdRespuestasImg, $idRespuesta);
                $valorRespuesta = mysqli_real_escape_string($conexion, $_POST["respuesta".$i][$k]);
                $arrIdRespuestas[$k] = '"'.$idRespuesta.'"';
                //añadimos la respuesta a la BD
                $consulta = 'INSERT INTO respuesta (id_Respuesta, Respuesta) VALUES ("'.$idRespuesta.'", "'.$valorRespuesta.'")';
                $consultar = mysqli_query($conexion, $consulta);
            }
        }
        //añadimos la pregunta a la BD
        $consulta = 'INSERT INTO pregunta VALUES ("'.$idPregunta.'", "'.$valorPregunta.'", '.$arrIdRespuestas[0].', '.$arrIdRespuestas[1].', '.$arrIdRespuestas[2].', '.$arrIdRespuestas[3].', '.$arrIdRespuestas[4].', '.$arrIdRespuestas[5].', '.$arrIdRespuestas[6].', '.$arrIdRespuestas[7].', '.$arrIdRespuestas[8].', '.$arrIdRespuestas[9].')';
        $consultar = mysqli_query($conexion, $consulta);
    }
}

//añadimos la encuesta a la BD
$consulta = 'INSERT INTO encuesta VALUES ("'.$idEncuesta.'", "'.$titulo.'", "'.$descripcion.'", '.$categoria.', "'.$fechaIni.'", "'.$fechaFin.'", '.$arrIdPreguntas[0].', '.$arrIdPreguntas[1].', '.$arrIdPreguntas[2].', '.$arrIdPreguntas[3].', '.$arrIdPreguntas[4].', '.$minUser.', '.$grupo.')';
$consultar = mysqli_query($conexion, $consulta);

//actualizamos el numero de encuestas generadas del usuario
$_SESSION["generadas"]++;
$consulta = 'UPDATE usuario SET EncuCreadas = '.$_SESSION["generadas"].' WHERE id_usuario = '.$_SESSION["idUser"].'';
$consultar = mysqli_query($conexion, $consulta);

//recibimos las fotos de las preguntas y las renombramos segun su id
for ($i=0; $i < 5; $i++) {
    if($_FILES["imgQuest"]["type"][$i] == "image/png" || $_FILES["imgQuest"]["type"][$i] == "image/jpg" || $_FILES["imgQuest"]["type"][$i] == "image/jpeg") {
        $dir = '../../statics/img/fotosQuest';
        $temporal = $_FILES["imgQuest"]["tmp_name"][$i];
        $extension = pathinfo($_FILES["imgQuest"]["name"][$i], PATHINFO_EXTENSION);
        rename($temporal, $dir."/".str_replace('"', "", $arrIdPreguntas[$i]).".".$extension);
    }
}
//recibimos las fotos de las respuestas y las renombramos segun su id
for ($i=0; $i < count($arrIdRespuestasImg); $i++) {
    if($_FILES["imgResp"]["type"][$i] == "image/png" || $_FILES["imgResp"]["type"][$i] == "image/jpg" || $_FILES["imgResp"]["type"][$i] == "image/jpeg") {
        $dir = '../../statics/img/fotosResp';
        $temporal = $_FILES["imgResp"]["tmp_name"][$i];
        $extension = pathinfo($_FILES["imgResp"]["name"][$i], PATHINFO_EXTENSION);
        rename($temporal, $dir."/".str_replace('"', "", $arrIdRespuestasImg[$i]).".".$extension);
    }
}

//el creador contesta la encuesta
$consulta = 'INSERT INTO encuestas_respondidas VALUES ("'.$_SESSION["idUser"].'", "'.$idEncuesta.'")';
$consultar = mysqli_query($conexion, $consulta);

//en caso de reutilizar una encuesta, guarda las fotos nuevas
$indice = 0;
foreach ($_POST['imgRespOrig'] as $key => $value) {
    if ($value != "0") {
        $format = pathinfo($value, PATHINFO_EXTENSION);
        copy("../../statics/img/fotosResp/".$value, '../../statics/img/fotosResp/'.$arrIdRespuestasImg[$indice].'.'.$format);
    }
    $indice++;
}
$indice = 0;
foreach ($_POST['imgQuestOrig'] as $key => $value) {
    if ($value != "0") {
        $format = pathinfo($value, PATHINFO_EXTENSION);
        copy("../../statics/img/fotosQuest/".$value, '../../statics/img/fotosQuest/'.$arrIdPreguntas[$indice].'.'.$format);
    }
    $indice++;
}

header("location: ../../templates/encuestas.html")

?>
