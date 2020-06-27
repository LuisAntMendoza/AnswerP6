<?php
session_start();
include("./config.php");
$conexion = conectarBD();
$arrContestadas = [];
if (isset($_SESSION['poder'])) {
    $consulta = 'SELECT * FROM encuestas_respondidas';
    $consultar = mysqli_query($conexion, $consulta);
    while ($resultado = mysqli_fetch_row($consultar)) {
        if($resultado[0] == $_SESSION['idUser']) {
            array_push($arrContestadas, $resultado[1]);
        }
    }
}

$response = [];
for ($i=0; $i < count($arrContestadas); $i++) {
    $result = mysqli_query($conexion, 'SELECT id_encuesta, Titulo FROM encuesta WHERE id_encuesta = "'.$arrContestadas[$i].'"');
    while($row = mysqli_fetch_assoc($result))
    {
    	array_push($response, $row);
    }
}

echo json_encode($response);

 ?>
