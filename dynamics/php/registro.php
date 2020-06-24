<?php
include("config.php");
$conexion = conectarBD();

function consultarUsuario($usuario) {
    $validarUser = true;
    $consultar = mysqli_query($conexion, "SELECT Usuario FROM usuario");
    while($resultado = mysqli_fetch_array($consultar)) {
        $usuariodec = Decifrar($resultado[0]);
        if($usuariodec == $usuario) {
            $validarUser = false;
        }
    }
    return $validarUser;
}
//validamos nombre
if(preg_match("/(^[A-Z][a-zñÑáéíóúÁÉÍÓÚ]+$)|(^[A-Z][a-zñÑáéíóúÁÉÍÓÚ]+[ ][A-Z][a-zñÑáéíóúÁÉÍÓÚ]+$)/", $_POST['nombre'])) {
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos Apellido Paterno
if(preg_match("/(^[A-Z][a-zñÑáéíóúÁÉÍÓÚ]+$)/", $_POST['apPat'])) {
    $apPat = mysqli_real_escape_string($conexion, $_POST['apPat']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos Apellido Materno
if(preg_match("/(^[A-Z][a-zñÑáéíóúÁÉÍÓÚ]+$)/", $_POST['apMat'])) {
    $apMat = mysqli_real_escape_string($conexion, $_POST['apMat']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos claveUn
if(preg_match("/^[A-Z]{4}\d{6}(H|M)[A-Z0-9]{7}$/", $_POST['claveUn'])) {
    $claveUn = mysqli_real_escape_string($conexion, $_POST['claveUn']);
}
else if (preg_match("/^\d{6}$/", $_POST['claveUn'])) {
    $claveUn = mysqli_real_escape_string($conexion, $_POST['claveUn']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos usuario
if(preg_match("/^\d{9}$/", $_POST['usuario'])) {
    $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
    $userFoto = $usuario;
    //validamos grupo
    if(preg_match("/^\d{2}/", $_POST['grupo'])) {
        $grupo = mysqli_real_escape_string($conexion, $_POST['grupo']);
        $grupo = intval($grupo);
    }
    else {
        header("location:../../templates/errorRegistro.html");
        exit();
    }
}
else if (preg_match("/^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$/", $_POST['usuario'])) {
    $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
    $userFoto = $usuario;
    $grupo = "null";
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos fNac
if(preg_match("/^(([0-1][0-9]{3})|(20(([0-1][0-9])|20)))-(0[0-9]|1[0-2])-(([0-2][1-9])|3[0-1])$/", $_POST['fNac'])) {
    $fNac = mysqli_real_escape_string($conexion, $_POST['fNac']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//validamos Correo electronico
if(preg_match("/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/", $_POST['email'])) {
    $email = mysqli_real_escape_string($conexion, $_POST['email']);
}
else {
    header("location:../../templates/errorRegistro.html");
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

if(consultarUsuario($usuario) == false) {
    header("location:../../templates/errorRegistro.html");
    exit();
}

//ciframos datos sensibles
$nombre = Cifrar($nombre);
$apPat = Cifrar($apPat);
$apMat = Cifrar($apMat);
$claveUn = Cifrar($claveUn);
$usuario = Cifrar($usuario);
$fNac = Cifrar($fNac);
$email = Cifrar($email);
$Contraseña = password_hash($Contraseña, PASSWORD_BCRYPT);

//archivo
if($_FILES["imgPerfil"]["type"] == "image/png" || $_FILES["imgPerfil"]["type"] == "image/jpg" || $_FILES["imgPerfil"]["type"] == "image/jpeg") {
    $dir = '../../statics/img/fotosPerfil';
    $temporal = $_FILES["imgPerfil"]["tmp_name"];
    $extension = pathinfo($_FILES["imgPerfil"]["name"], PATHINFO_EXTENSION);
    rename($temporal, $dir."/".$userFoto.".".$extension);
}
else {
    header("location: ../../templates/errorRegistro.html");
    exit();
}

//subimos usuario
$consulta = 'INSERT INTO usuario (Usuario, Identificador, Nombre, ApellidoPat, ApellidoMat, FNacimiento, CorreoElectronico, Contraseña, id_Grupo) VALUES ("'.$usuario.'", "'.$claveUn.'", "'.$nombre.'", "'.$apPat.'", "'.$apMat.'", "'.$fNac.'", "'.$email.'", "'.$Contraseña.'", '.$grupo.')';
$consultar = mysqli_query($conexion, $consulta);

//mandamos a inicio
header("location: ../../index.html");
?>
