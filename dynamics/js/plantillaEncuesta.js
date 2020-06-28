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
    let minutes = todayTime.getMinutes();
    return year + "-" + month + "-" + day + "T" + hour + ":" + minutes;
}

function getResp(info, id) {
    let regreso = null;
    for (let i = 0; i < info.length; i++) {
        if (info[i].id_Respuesta == id) {
            regreso = info[i].Respuesta;
        }
    }
    return regreso;
}

function crearPregunta() {
    if ($($("#encuesta").children()).length < 8) {
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
            $(borrar).addClass("Terciario");
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
        $(button).addClass("agregarResp Terciario");
        $(button).on("click", (e) => {
            e.preventDefault();
            if ($($($(e.target).parent()).children()).length < 11) {
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
                colorearPaleta();
            }
        });
        let borrarQuest = $("<button>");
        borrarQuest.text("Borrar Pregunta");
        $(borrarQuest).addClass("Terciario")
        $(borrarQuest).on("click", (e) => {
            e.preventDefault();
            if ($($("#encuesta").children()).length > 4) {
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
            if (data.poder == 3) {
                $("#filtros").css("display", "none");
            }
        }
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
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
            let option = $("<option>");
            $(option).attr("value", data[i]["id_tipo"]);
            $(option).text(data[i]["TipoUsuario"]);
            $("#select-poder").append(option);
        }
    }).catch((error) => {
        console.log(error.message);
    });
    $.ajax({
        url: "../dynamics/php/getDatosEncuesta.php",
        data: {
            idEncuesta: valCookie("encuesta")
        },
        dataType: "json",
        method: "post",
        error: (error) => {
            console.log(error);
        }
    }).then((data) => {
        console.log(data);
        if (data[0] == undefined) {
            window.location = "encuestas.html";
        }
        let id_Resp = 0;
        $("#titulo-encuesta").attr("value", data[0].Titulo);
        $("#descripcion-encuesta").text(data[0].Descripcion);
        $($("#select-categoria").children()[parseInt(data[0].id_Categoria)]).attr("selected", "selected");
        $($("#select-poder").children()[parseInt(data[0].usuarioMin)]).attr("selected", "selected");
        $($("#select-grupos").children()[parseInt(data[0].FiltroGrupo)]).attr("selected", "selected");
        $(".inpIdEnc").attr("value", data[0].id_encuesta);
        for (let i = 0; i < 5; i++) {
            if (data.length > i + 1) {
                if (typeof data[i + 1].id_pregunta == "string") {
                    preguntas++;
                    let pregunta = $("<div>");
                    $(pregunta).addClass("pregunta CuartoColor");
                    let editQuest = $("<input>");
                    $(editQuest).attr("type", "text");
                    $(editQuest).addClass("editText");
                    $(editQuest).attr("value", data[i + 1].Pregunta);
                    $(editQuest).attr("name", "pregunta" + preguntas);
                    $(editQuest).attr("required", "true");
                    let imgQuest = $("<img>");
                    $(imgQuest).addClass("fotoPregunta");
                    let editImgQuest = $("<input>");
                    $(editImgQuest).attr("type", "file");
                    $(editImgQuest).attr("name", "imgQuest[]");
                    $(editImgQuest).attr("accept", "image/*");
                    $(editImgQuest).on("change", (e) => {
                        $($($(e.target).parent()).children()[1]).attr("value", "0");
                    });
                    let hidImgQuest = $("<input>");
                    $(hidImgQuest).attr("type", "hidden");
                    $(hidImgQuest).attr("name", "imgQuestOrig[]");
                    $(hidImgQuest).attr("value", "0");
                    let respuestas = $("<div>");
                    $(respuestas).addClass("respuestas");
                    for (let k = 0; k < 10; k++) {
                        if (data[i + 1]["id_Respuesta" + (k + 1)] != null) {
                            let respuesta = $("<div>");
                            $(respuesta).addClass("respuesta");
                            let radio = $("<input>");
                            $(radio).attr("type", "text");
                            $(radio).attr("name", "respuesta" + preguntas + "[]");
                            $(radio).attr("value", getResp(data, data[i + 1]["id_Respuesta" + (k + 1)]));
                            $(radio).attr("required", "true");
                            let imgResp = $("<img>");
                            $(imgResp).attr("id", id_Resp);
                            $(imgResp).addClass("imgRespuesta");
                            let hidImgResp = $("<input>");
                            $(hidImgResp).attr("name", "imgRespOrig[]");
                            $(hidImgResp).attr("type", "hidden");
                            $(hidImgResp).attr("value", "0");
                            let inpImgResp = $("<input>");
                            $(inpImgResp).attr("type", "file");
                            $(inpImgResp).attr("name", "imgResp[]");
                            $(inpImgResp).attr("accept", "image/*");
                            $(inpImgResp).on("change", (e) => {
                                $($($(e.target).parent()).children()[2]).attr("value", "0");
                            });
                            let span = $("<span>");
                            $(span).text("·");
                            let borrar = $("<button>");
                            $(borrar).text("Borrar respuesta");
                            $(borrar).addClass("Terciario");
                            $(borrar).on("click", (e) => {
                                e.preventDefault();
                                if ($($($(e.target).parent()).parent()).length > 3) {
                                    console.log($($($($(e.target).parent()).parent()).children()).length);
                                    $($(e.target).parent()).remove();
                                }
                            });
                            $(respuesta).append(span, radio, hidImgResp, imgResp, inpImgResp, borrar);
                            $(respuestas).append(respuesta);
                        }

                        id_Resp++;

                    }
                    let button = $("<button>");
                    $(button).text("Agregar Respuesta");
                    $(button).addClass("agregarResp Terciario");
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
                            $(borrar).addClass("Terciario")
                            $(borrar).on("click", (e) => {
                                e.preventDefault();
                                if ($($($($(e.target).parent()).parent()).children()).length > 3) {
                                    console.log($($($($(e.target).parent()).parent()).children()).length);
                                    $($(e.target).parent()).remove();
                                }
                            })
                            $(respuesta).append(b, inpRespuesta, inpFileResp, borrar);
                            $(e.target).before(respuesta);
                            colorearPaleta();
                        }
                    });
                    let borrarQuest = $("<button>");
                    $(borrarQuest).text("Borrar Pregunta");
                    $(borrarQuest).addClass("Terciario");
                    $(borrarQuest).on("click", (e) => {
                        e.preventDefault();
                        if ($($("#encuesta").children()).length > 4) {
                            preguntas--;
                            $($(e.target).parent()).remove();
                        }
                    })
                    $(respuestas).append(button);
                    $(pregunta).append(editQuest, hidImgQuest, imgQuest, editImgQuest, respuestas, borrarQuest);
                    $("#agregarQuest").before(pregunta);
                    colorearPaleta();
                }
            }

            $.ajax({
                url: "../dynamics/php/extImgQuest.php",
                data: {
                    nomImg: data[0].id_encuesta + "Q"
                },
                dataType: "json",
                method: "post",
                error: (error) => {
                    console.log(error);
                }
            }).then((dataImg) => {
                console.log(dataImg);
                for (let n = 0; n < 5; n++) {
                    if (dataImg[n] == "null") {
                        //$($($("#cont-encuesta").children()[i + 1]).children()[1]).remove();
                    } else {
                        $($($($("#cont-encuesta").children()[1]).children()[n]).children()[2]).attr("src", "../statics/img/fotosQuest/" + data[n + 1].id_pregunta + "." + dataImg[n]);
                        $($($($("#cont-encuesta").children()[1]).children()[n]).children()[1]).attr("value", data[n + 1].id_pregunta + "." + dataImg[n]);
                        console.log("Entre");
                    }
                }
            });
            $.ajax({
                url: "../dynamics/php/extImgResp.php",
                data: {
                    nomResp: data[0].id_encuesta + "Q"
                },
                dataType: "json",
                method: "post",
                error: (error) => {
                    console.log(error);
                }
            }).then((dataResp) => {
                let l = 0;
                for (let i = 0; i < 5; i++) {
                    for (let k = 0; k < 10; k++) {
                        if (dataResp[l] == "null") {
                            $(".imgRespuesta#" + l).remove();
                        } else {
                            $(".imgRespuesta#" + l).attr("src", "../statics/img/fotosResp/" + data[i + 1].id_pregunta + "R" + k + "." + dataResp[l]);
                            $($($(".imgRespuesta#" + l).parent()).children()[2]).attr("value", data[i + 1].id_pregunta + "R" + k + "." + dataResp[l]);
                            console.log("Entre");
                        }
                        l++;
                    }
                }
            });
        }
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
    $("#agregarQuest").on("click", (e) => {
        e.preventDefault();
        crearPregunta();
    });
})