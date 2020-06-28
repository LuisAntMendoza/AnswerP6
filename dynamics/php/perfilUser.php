<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//obtiene los datos del perfil solicitado
$response = [];
$idUser = $_POST['idUser'];
$consulta = 'SELECT * FROM usuario WHERE id_usuario = "'.$idUser.'"';
$consultar = mysqli_query($conexion, $consulta);
$resultado = mysqli_fetch_row($consultar);
foreach ($resultado as $key => $value) {
    if ($key > 0 && $key < 8) {
        array_push($response, Decifrar($value));
    }
    else {
        array_push($response, $value);
    }
}

echo json_encode($response);
 ?>
