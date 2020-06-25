$(document).ready(() => {
    $("#btn-acceder").on("click", () => {
        window.location = "registro.html";
    })
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $($("#btn-acceder").children()[0]).text("Acceder");
        } else {
            $($("#btn-acceder").children()[0]).text("Ver perfil");
        }
    }).catch((error) => {
        console.log(error);
    })
})