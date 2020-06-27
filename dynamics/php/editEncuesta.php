<?php
session_start();
include("config.php");
$conexion = conectarBD();

if (isset($_POST['Titulo']) && $_POST['Titulo'] != "") {
    $titulo = mysqli_real_escape_string($conexion, $_POST['Titulo']);
    $consulta = 'UPDATE encuesta SET Titulo = "'.$titulo.'" WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
elseif (isset($_POST['Descripcion']) && $_POST['Descripcion'] != "") {
    $desc = mysqli_real_escape_string($conexion, $_POST['Descripcion']);
    $consulta = 'UPDATE encuesta SET Descripcion = "'.$desc.'" WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
elseif (isset($_POST['Categoria'])) {
    if($_POST['Categoria'] == 0) {
        $cat = "null";
    }else {
        $cat = mysqli_real_escape_string($conexion, $_POST['Categoria']);
    }
    $consulta = 'UPDATE encuesta SET id_Categoria = "'.$cat.'" WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
elseif (isset($_POST['usuarioMin'])) {
    $user = mysqli_real_escape_string($conexion, $_POST['usuarioMin']);
    $consulta = 'UPDATE encuesta SET usuarioMin = "'.$user.'" WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
elseif (isset($_POST['FiltroGrupo'])) {
    if ($_POST['FiltroGrupo'] == 0) {
        $grupo = "null";
    }
    else {
        $grupo = mysqli_real_escape_string($conexion, $_POST['FiltroGrupo']);
    }
    $consulta = 'UPDATE encuesta SET FiltroGrupo = '.$grupo.' WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
header("location: ../../templates/editarEncuestas.html");

?>
