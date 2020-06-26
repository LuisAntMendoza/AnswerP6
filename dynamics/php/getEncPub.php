<?php
session_start();
include("config.php");
$conexion = conectarBD();

if ($_POST['categoria'] == 0) {
    $categoria = "%";
}
else {
    $categoria = mysqli_real_escape_string($conexion, $_POST["categoria"]);
}
$buscar = mysqli_real_escape_string($conexion, $_POST['buscar']);

$result = mysqli_query($conexion, 'SELECT id_encuesta, Titulo FROM encuesta WHERE Titulo LIKE "%'.$buscar.'%" OR id_encuesta LIKE "%'.$buscar.'%" AND id_Categoria LIKE "'.$categoria.'" AND usuarioMin <= "'.$_SESSION["poder"].'"');
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);

 ?>
