$(document).ready(() => {
    $.ajax({
        url: "../dynamics/php/perfilUser.php",
        data: {
            idUser: valCookie("usuario")
        },
        dataType: "json",
        method: "post",
        error: (error) => {
            console.log(error);
        }
    }).then((data) => {
        $("#h5-nombre").text("Bienvenid@: " + data[3] + " " + data[4] + " " + data[5]);
        $("#h5-usuario").text("Usuario: " + data[1]);
        $("#h5-fNac").text("Fecha de Nacimiento: " + data[6]);
        $("#h5-correo").text("Correo electrónico: " + data[7]);
        $("#h5-creadas").text("Encuestas creadas: " + data[10])
        $("#h5-contestadas").text("Encuestas contestadas: " + data[11]);
        $.ajax({
            url: "../dynamics/php/validarImg.php",
            data: {
                idUser: data[1]
            },
            dataType: "json",
            method: "post",
            error: (error) => {
                console.log(error);
            }
        }).then((datos) => {
            $("#img-perfil").attr("src", "../statics/img/fotosPerfil/" + data[1] + "." + datos);
        })
    })
})