<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//validamos contraseña
if(preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-+])([A-Za-z\d!-+]|[^ ]){10,20}$/", $_POST['password'])) {
    $Contraseña = mysqli_real_escape_string($conexion, $_POST['password']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}
//hasheamos la contraseña y obtenemos el usuario de la BD
$Contraseña = password_hash($Contraseña, PASSWORD_BCRYPT);
$consulta = "SELECT Usuario FROM usuario";
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    if($_SESSION['usuario'] == Decifrar($resultado[0])) {
        $usuario = $resultado[0];
    }
}
//actualizamos la contraseña
$consulta = 'UPDATE usuario SET Contraseña = "'.$Contraseña.'" WHERE Usuario = "'.$usuario.'"';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/perfil.html");

?>
