<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();
//obtiene los votos de las respuestas de la encuesta ingresada
$idEncuesta = $_POST['idEncuesta'];
for ($i=1; $i < count($_POST); $i++) {
    $idRespuesta = $idEncuesta."Q".$i."R".$_POST["Respuestas".$i];
    $consulta = mysqli_query($conexion, 'SELECT votos FROM respuesta WHERE id_Respuesta = "'.$idRespuesta.'"');
    $resultado = mysqli_fetch_row($consulta);
    $resultado[0]++;
    $votos = $resultado[0];
    $consulta = 'UPDATE respuesta SET votos = "'.$votos.'" WHERE id_Respuesta = "'.$idRespuesta.'"';
    $consultar = mysqli_query($conexion, $consulta);

}
//si el usuario tiene cuenta, le añadimos 1 a sus encuestas respondidas
if(isset($_SESSION['poder'])) {
    $consulta = 'INSERT INTO encuestas_respondidas VALUES ("'.$_SESSION["idUser"].'", "'.$idEncuesta.'")';
    $consultar = mysqli_query($conexion, $consulta);
    $_SESSION['respondidas']++;
    $consulta = 'UPDATE usuario SET EncuRespondidas = '.$_SESSION['respondidas'].' WHERE id_usuario = '.$_SESSION['idUser'].'';
    $consultar = mysqli_query($conexion, $consulta);
}
header("location: ../../templates/respEncuesta.html");

?>
