<?php
//iniciamos sesión y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//borramos el reporte y regresamos a admin
$consulta = 'DELETE FROM reporte WHERE id_reporte = '.$_POST['idReporte'];
$consultar = mysqli_query($conexion, $consulta);

echo $consultar;
 ?>
