<?php
session_start();
include("./config.php");
$conexion = conectarBD();
$idEncuesta = $_POST['idEncuesta'];
for ($i=1; $i < count($_POST); $i++) {
    $idRespuesta = $idEncuesta."Q".$i."R".$_POST["Respuestas".$i];
    $consulta = mysqli_query($conexion, 'SELECT votos FROM respuesta WHERE id_Respuesta = "'.$idRespuesta.'"');
    $resultado = mysqli_fetch_row($consulta);
    $resultado[0]++;
    $votos = $resultado[0];
    $consultar = 'UPDATE respuesta SET votos = "'.$votos.'" WHERE id_Respuesta = "'.$idRespuesta.'"';
    $consulta = mysqli_query($conexion, $consultar);
    header("location: ../../templates/respEncuesta.html");
}


?>
