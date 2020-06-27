$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $($("#link-perfil").children()[0]).text("Iniciar Sesión");
            $("#link-perfil").on("click", () => {
                window.location = "registro.html";
            })
        } else {
            $($("#link-perfil").children()[0]).text("Perfil");
            $("#link-perfil").on("click", () => {
                window.location = "perfil.html";
            })
        }
    }).catch((error) => {
        console.log(error);
    });
    $("#link-inicio").on("click", () => {
        window.location = "inicio.html";
    })
    $("#cerrar-sesion").on("click", (e) => {
        e.preventDefault();
        window.location = "../dynamics/php/cerrarSesion.php";
    })
    $("#btn-usuario").on("click", (e) => {
        e.preventDefault();
        window.location = "registro.html";
    })
    $("#link-encuestas").on("click", () => {
        window.location = "encuestas.html";
    })
    $("#ultimoNav").on("click", () => {
        window.location = "creditos.html";
    })
    $("#admin").on("click", () => {
        window.location = "admin.html";
    });
})