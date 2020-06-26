$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $($("#btn-acceder").children()[0]).text("Acceder");
            $("#btn-acceder").on("click", () => {
                window.location = "registro.html";
            });
        } else {
            $($("#btn-acceder").children()[0]).text("Ver perfil");
            $("#btn-acceder").on("click", () => {
                window.location = "perfil.html";
            });
        }
    }).catch((error) => {
        console.log(error);
    })
})