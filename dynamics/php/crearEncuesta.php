<?php
include("config.php");
$conexion = conectarBD();
session_start();
print_r($_POST);
echo "<br>";
echo "<br>";
//print_r($_FILES);
echo "<br>";

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

$idEncuesta = $_SESSION["idUser"]."-".($_SESSION["generadas"]+1);
echo "Id encuesta: ".$idEncuesta;
$l = 0;
$arrIdPreguntas = ["null","null","null","null","null"];
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
                $valorRespuesta = mysqli_real_escape_string($conexion, $_POST["respuesta".$i][$k]);
                $arrIdRespuestas[$k] = '"'.$idRespuesta.'"';
                echo "id: ".$idRespuesta;
                echo "valor: ".$valorRespuesta;
                echo "<br>";
                $consulta = 'INSERT INTO respuesta (id_Respuesta, Respuesta) VALUES ("'.$idRespuesta.'", "'.$valorRespuesta.'")';
                $consultar = mysqli_query($conexion, $consulta);

            }
        }
        print_r($arrIdRespuestas);
        echo "<br>";
        print_r($idPregunta);
        echo "<br>";
        print_r($valorPregunta);
        echo "<br>";
        $consulta = 'INSERT INTO pregunta VALUES ("'.$idPregunta.'", "'.$valorPregunta.'", '.$arrIdRespuestas[0].', '.$arrIdRespuestas[1].', '.$arrIdRespuestas[2].', '.$arrIdRespuestas[3].', '.$arrIdRespuestas[4].', '.$arrIdRespuestas[5].', '.$arrIdRespuestas[6].', '.$arrIdRespuestas[7].', '.$arrIdRespuestas[8].', '.$arrIdRespuestas[9].')';
        $consultar = mysqli_query($conexion, $consulta);
    }
}
echo $idEncuesta;
echo "<br>";
echo $titulo;
echo "<br>";
echo $descripcion;
echo "<br>";
echo $categoria;
echo "<br>";
echo $fechaIni;
echo "<br>";
echo $fechaFin;
echo "<br>";
print_r($arrIdPreguntas);
echo "<br>";




print_r($arrIdPreguntas);
$consulta = 'INSERT INTO encuesta VALUES ("'.$idEncuesta.'", "'.$titulo.'", "'.$descripcion.'", '.$categoria.', "'.$fechaIni.'", "'.$fechaFin.'", '.$arrIdPreguntas[0].', '.$arrIdPreguntas[1].', '.$arrIdPreguntas[2].', '.$arrIdPreguntas[3].', '.$arrIdPreguntas[4].')';
$consultar = mysqli_query($conexion, $consulta);

$_SESSION["generadas"]++;
$consulta = 'UPDATE usuario SET EncuCreadas = '.$_SESSION["generadas"].' WHERE id_usuario = '.$_SESSION["idUser"].'';
$consultar = mysqli_query($conexion, $consulta);

?>
