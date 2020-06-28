function colorearBordes() {
    if (valCookie("Paleta") == 1) {
        $("#effect").css("background-image", "linear-gradient(-90deg, rgba(128, 128, 128, 0.8) 5% , rgba(255, 255, 255, 0) 100% )");
    } else if (valCookie("Paleta") == 2) {
        $("#effect").css("background-image", "linear-gradient(-90deg, rgba(37, 36, 51, 0.8) 5% , rgba(255, 255, 255, 0) 100% )");
    } else if (valCookie("Paleta") == 3) {
        $("#effect").css("background-image", "linear-gradient(-90deg, rgba(56, 56, 56, 0.8) 5% , rgba(255, 255, 255, 0) 100% )");
    }
}

$(document).ready(() => {
    colorearBordes();
    $("#aceptarPaleta").on("click", () => {
        setTimeout(colorearBordes, 450);
    })
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
    $("#btn-encuestas").on("click", () => {
        window.location = "encuestas.html";
    })
})