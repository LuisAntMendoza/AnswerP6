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
            let inpFileResp = $("<input>");
            $(inpFileResp).attr("type", "file");
            $(inpFileResp).attr("name", "imgResp[]");
            $(inpFileResp).attr("accept", "image/*");
            let borrar = $("<button>");
            $(borrar).text("Borrar respuesta");
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
        $(button).on("click", (e) => {
            if ($($($(e.target).parent()).children()).length < 11) {
                e.preventDefault();
                let b = $("<b>");
                $(b).text("·");
                let inpRespuesta = $("<input>");
                $(inpRespuesta).attr("type", "text");
                $(inpRespuesta).attr("name", "respuesta" + preguntas + "[]");
                let inpFileResp = $("<input>");
                $(inpFileResp).attr("type", "file");
                $(inpFileResp).attr("name", "imgResp[]");
                $(inpFileResp).attr("accept", "image/*");
                let respuesta = $("<div>");
                $(respuesta).addClass("respuesta");
                let borrar = $("<button>");
                $(borrar).text("Borrar respuesta");
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
let preguntas = 0;
$(document).ready(() => {
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
})