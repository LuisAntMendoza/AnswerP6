<?php
include("./config.php");
$conexion = conectarBD();

$usuario = "";
$email = "";

//validamos usuario
if(preg_match("/(^\d{9}$)|(^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$)/", $_POST['usuario'])) {
    $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
}
else if (preg_match("/(^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)/", $_POST['usuario'])) {
    $email = mysqli_real_escape_string($conexion, $_POST['usuario']);
}
else {
    header("location: ../../templates/errorLogin.html");
    exit();
}

//validamos contraseña
if(preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-+])([A-Za-z\d!-+]|[^ ]){10,20}$/", $_POST['password'])) {
    $Contraseña = mysqli_real_escape_string($conexion, $_POST['password']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

if($usuario != "") {
    $consulta = 'SELECT * FROM usuario';
    $consultar = mysqli_query($conexion, $consulta);
    while($resultado = mysqli_fetch_array($consultar)) {
        $usuarioBase = Decifrar($resultado[1]);
        if($usuarioBase == $usuario) {
            if(password_verify($Contraseña, $resultado[8])) {
                // $_SESSION['usuario'] = Decifrar($resultado[1]);
                // $_SESSION['Usuario2'] = $resultado[0];
                // $_SESSION['Poder'] = $resultado[7];
                //header("location: index.php");
                echo "exito";
                exit();
            }
            else {
                echo "contra incorrecta";
                // $_SESSION['Error'] = "<p>Contraseña incorrecta</p>";
                header("location:../../templates/errorLogin.html");
                exit();
            }
        }
    }
    echo "no usuario";
    // $_SESSION['Error'] = "<p>Usuario no encontrado</p>";
    header("location:../../templates/errorLogin.html");
    exit();
}
if($email != "") {
    $consulta = 'SELECT * FROM usuario';
    $consultar = mysqli_query($conexion, $consulta);
    while($resultado = mysqli_fetch_array($consultar)) {
        $usuarioBase = Decifrar($resultado[7]);
        if($usuarioBase == $email) {
            if(password_verify($Contraseña, $resultado[8])) {
                // $_SESSION['usuario'] = Decifrar($resultado[1]);
                // $_SESSION['Usuario2'] = $resultado[0];
                // $_SESSION['Poder'] = $resultado[7];
                //header("location: index.php");
                echo "exito";
                exit();
            }
            else {
                echo "contra incorrecta";
                // $_SESSION['Error'] = "<p>Contraseña incorrecta</p>";
                header("location:../../templates/errorLogin.html");
                exit();
            }
        }
    }
    echo "no usuario";
    // $_SESSION['Error'] = "<p>Usuario no encontrado</p>";
    header("location:../../templates/errorLogin.html");
    exit();
}

?>
