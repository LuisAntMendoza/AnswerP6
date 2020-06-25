$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $("#cerrar-sesion").css("display", "none");
            $("#btn-usuario").text("Iniciar Sesión");
        } else {
            $("#btn-usuario").text("Bienvenid@: " + data.nombre);
        }
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
})