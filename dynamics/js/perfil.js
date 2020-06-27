$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            window.location = "inicio.html";
        } else {
            $("#h5-nombre").text("Bienvenid@: " + data.nombre + " " + data.apPat + " " + data.apMat);
            $("#h5-usuario").text("Usuario: " + data.usuario);
            $("#h5-fNac").text("Fecha de Nacimiento: " + data.fNac);
            $("#h5-correo").text("Correo electrónico: " + data.correo);
            $("#h5-creadas").text("Encuestas creadas: " + data.generadas)
            fetch("../dynamics/php/validarImg.php").then((respuesta) => {
                return respuesta.json();
            }).then((datos) => {
                $("#img-perfil").attr("src", "../statics/img/fotosPerfil/" + data.usuario + "." + datos);
            }).catch((error) => {
                console.log(error);
            })
        }
    }).catch((error) => {
        console.log(error);
    })
    $("#btn-consultar").on("click", () => {
        window.location = "encuestas.html";
    })
})