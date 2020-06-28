function crearPregunta() {
    if ($($("#encuesta").children()).length < 7) {
        preguntas++;
        let pregunta = $("<div>");
        $(pregunta).addClass("pregunta");
        $(pregunta).addClass("CuartoColor");
        let h4 = $("<h4>");
        $(h4).text("Ingrese su pregunta: ");
        let inpPregunta = $("<input>");
        $(inpPregunta).attr("type", "text");
        $(inpPregunta).attr("name", "pregunta" + preguntas);
        $(inpPregunta).attr("class", "inpPregunta");
        $(inpPregunta).attr("required", "true");
        let inpFileQuest = $("<input>");
        $(inpFileQuest).attr("type", "file");
        $(inpFileQuest).attr("name", "imgQuest[]");
        $(inpFileQuest).attr("accept", "image/*");
        let respuestas = $("<div>");
        $(respuestas).addClass("respuestas");
        for (let i = 0; i < 2; i++) {
            let respuesta = $("<div>");
            $(respuesta).addClass("respuesta");
            let b = $("<b>");
            $(b).addClass("opcion")
            $(b).text("·");
            let inpRespuesta = $("<input>");
            $(inpRespuesta).attr("type", "text");
            $(inpRespuesta).attr("name", "respuesta" + preguntas + "[]");
            $(inpRespuesta).attr("required", "true");
            let inpFileResp = $("<input>");
            $(inpFileResp).attr("type", "file");
            $(inpFileResp).attr("name", "imgResp[]");
            $(inpFileResp).attr("accept", "image/*");
            let borrar = $("<button>");
            $(borrar).text("Borrar respuesta");
            $(borrar).addClass("Terciario")
            $(borrar).on("click", (e) => {
                e.preventDefault();
                if ($($($($(e.target).parent()).parent()).children()).length > 3) {
                    console.log($($($($(e.target).parent()).parent()).children()).length);
                    $($(e.target).parent()).remove();
                }
            });
            $(respuesta).append(b, inpRespuesta, inpFileResp, borrar);
            $(respuestas).append(respuesta);
        }
        let button = $("<button>");
        $(button).text("Agregar Respuesta");
        $(button).addClass("agregarResp");
        $(button).addClass("Terciario");
        $(button).on("click", (e) => {
            e.preventDefault();
            if ($($($(e.target).parent()).children()).length < 11) {
                let b = $("<b>");
                $(b).text("·");
                let inpRespuesta = $("<input>");
                $(inpRespuesta).attr("type", "text");
                $(inpRespuesta).attr("name", $($($($(e.target).parent()).children()[0]).children()[1]).attr("name"));
                let inpFileResp = $("<input>");
                $(inpFileResp).attr("type", "file");
                $(inpFileResp).attr("name", "imgResp[]");
                $(inpFileResp).attr("accept", "image/*");
                let respuesta = $("<div>");
                $(respuesta).addClass("respuesta");
                let borrar = $("<button>");
                $(borrar).text("Borrar respuesta");
                $(borrar).addClass("Terciario");
                $(borrar).on("click", (e) => {
                    e.preventDefault();
                    if ($($($($(e.target).parent()).parent()).children()).length > 3) {
                        console.log($($($($(e.target).parent()).parent()).children()).length);
                        $($(e.target).parent()).remove();
                    }
                })
                $(respuesta).append(b, inpRespuesta, inpFileResp, borrar);
                $(e.target).before(respuesta);
            }
        });
        let borrarQuest = $("<button>");
        borrarQuest.text("Borrar Pregunta");
        $(borrarQuest).addClass("Terciario");
        $(borrarQuest).on("click", (e) => {
            e.preventDefault();
            if ($($("#encuesta").children()).length > 3) {
                preguntas--;
                $($(e.target).parent()).remove();
            }
        })
        $(respuestas).append(button);
        $(pregunta).append(h4, inpPregunta, inpFileQuest, respuestas, borrarQuest);
        $("#agregarQuest").before(pregunta);
        colorearPaleta();
    }
}

function GetFormattedDate() {
    let todayTime = new Date();
    let month = (todayTime.getMonth() + 1);
    if (month < 10) {
        month = "0" + month;
    }
    let day = (todayTime.getDate());
    if (day < 10) {
        day = "0" + day;
    }
    let year = (todayTime.getFullYear());
    let hour = todayTime.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    let minutes = todayTime.getMinutes();
    return year + "-" + month + "-" + day + "T" + hour + ":" + minutes;
}
let preguntas = 0;
$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $("#cerrar-sesion").css("display", "none");
            $("#btn-usuario").text("Iniciar Sesión");
            $("#titulo").text("Favor de iniciar sesión");
            $(".head-encuesta").remove();
            $("#encuesta").remove();
            $("#regresar").css("display", "flex");
            $("#regresar").on("click", () => {
                window.location = "encuestas.html"
            });
        } else {
            $("#btn-usuario").text("Bienvenid@: " + data.nombre);
            if (data.poder == "3") {
                $("#divUserMin").css("display", "none");
            }
            if (data.poder == 1) {
                $("#admin").css("display", "flex");
            }
        }
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
    $("#agregarQuest").on("click", (e) => {
        e.preventDefault();
        crearPregunta();
    })
    crearPregunta();
    fetch("../dynamics/php/getCategoria.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let option = $("<option>");
            $(option).attr("value", data[i]["id_categoria"]);
            $(option).text(data[i]["Categoria"]);
            $("#select-categoria").append(option);
        }
    }).catch((error) => {
        console.log(error.message);
    });
    fetch("../dynamics/php/grupos.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let option = $("<option>");
            $(option).attr("value", data[i]["id_grupo"]);
            $(option).text(data[i]["Grupo"]);
            $("#select-grupos").append(option);
        }
    }).catch((error) => {
        console.log(error.message);
    });
    fetch("../dynamics/php/getTypeUser.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            let option = $("<option>");
            $(option).attr("value", data[i]["id_tipo"]);
            $(option).text(data[i]["TipoUsuario"]);
            $("#select-poder").append(option);
        }
    }).catch((error) => {
        console.log(error.message);
    });
    $("#select-poder").on("change", () => {
        if ($("#select-poder").val() == 3) {
            $("#divGrupos").css("display", "flex");
        } else {
            $("#divGrupos").css("display", "none");
        }
    })
    $("#fIni").attr("min", GetFormattedDate());
    $("#fIni").on("change", () => {
        $("#fFin").attr("min", $("#fIni").val());
    });
})