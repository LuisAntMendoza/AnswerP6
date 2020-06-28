<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//obtiene el poder y categoria para la busqueda
if (isset($_SESSION['poder'])) {
    $poder = $_SESSION['poder'];
} else {
    $poder = 4;
}
if ($_POST['categoria'] == 0) {
    $categoria = "%";
}
else {
    $categoria = mysqli_real_escape_string($conexion, $_POST["categoria"]);
}
if(preg_match("/^(\w\s)+$/", $_POST['buscar'])) {
    $buscar = mysqli_real_escape_string($conexion, $_POST['buscar']);
}
else {
    header("location: ../../templates/inicio.html");
}
//si es cualquier categoria hace esta busqueda
$response = [];
if ($categoria == "%") {
    $consulta = 'SELECT id_encuesta, Titulo FROM encuesta WHERE (Titulo LIKE "%'.$buscar.'%" OR id_encuesta LIKE "%'.$buscar.'%") AND (id_Categoria LIKE "'.$categoria.'" OR id_Categoria IS NULL) AND usuarioMin >= "'.$poder.'" AND (FiltroGrupo LIKE "'.$_SESSION["grupo"].'" OR FiltroGrupo IS NULL)';
    $result = mysqli_query($conexion, $consulta);
    while($row = mysqli_fetch_assoc($result))
    {
    	array_push($response, $row);
    }
}
//si es de una categoria determinada hace esta busqueda
else {
    $consulta = 'SELECT id_encuesta, Titulo FROM encuesta WHERE (Titulo LIKE "%'.$buscar.'%" OR id_encuesta LIKE "%'.$buscar.'%") AND id_Categoria LIKE "'.$categoria.'" AND usuarioMin >= "'.$poder.'" AND (FiltroGrupo LIKE "'.$_SESSION["grupo"].'" OR FiltroGrupo IS NULL)';
    $result = mysqli_query($conexion, $consulta);
    while($row = mysqli_fetch_assoc($result))
    {
    	array_push($response, $row);
    }
}

//regresa un arreglo con las encuestas obtenidas
echo json_encode($response);

 ?>
