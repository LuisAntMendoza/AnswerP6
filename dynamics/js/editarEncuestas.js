$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $("#cerrar-sesion").css("display", "none");
            $("#btn-usuario").text("Iniciar Sesión");
            window.location = "encuestas.html";
        } else {
            $("#btn-usuario").text("Bienvenid@: " + data.nombre);
            if (data.poder == 1) {
                $("#admin").css("display", "flex");
            }
            if (data.poder == 3) {
                $("#filtros").css("display", "none");
            }
        }
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
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
        $("#titulo-encuesta").text(data[0].Titulo);
        $("#descripcion-encuesta").text(data[0].Descripcion);
        $($("#select-categoria").children()[parseInt(data[0].id_Categoria)]).attr("selected", "selected");
        $($("#select-poder").children()[parseInt(data[0].usuarioMin)]).attr("selected", "selected");
        $($("#select-grupos").children()[parseInt(data[0].FiltroGrupo)]).attr("selected", "selected");
        $(".inpIdEnc").attr("value", data[0].id_encuesta);
        for (let i = 0; i < 5; i++) {
            if (data.length > i + 1) {
                if (typeof data[i + 1].id_pregunta == "string") {
                    let pregunta = $("<div>");
                    $(pregunta).addClass("pregunta CuartoColor");
                    let h5Quest = $("<h5>");
                    $(h5Quest).text(data[i + 1].Pregunta);
                    let formQuest = $("<form>");
                    $(formQuest).attr("method", "post");
                    $(formQuest).attr("action", "../dynamics/php/editText.php");
                    let editQuest = $("<input>");
                    $(editQuest).attr("type", "text");
                    $(editQuest).attr("name", data[0].id_encuesta + "Q" + (i + 1));
                    let btnEditQuest = $("<input>");
                    $(btnEditQuest).attr("type", "submit");
                    $(btnEditQuest).attr("value", "Editar");
                    $(formQuest).append(h5Quest, editQuest, btnEditQuest);
                    let formImgQuest = $("<form>");
                    $(formImgQuest).attr("action", "../dynamics/php/editImg.php");
                    $(formImgQuest).attr("method", "post");
                    $(formImgQuest).attr("enctype", "multipart/form-data");
                    let imgQuest = $("<img>");
                    $(imgQuest).addClass("fotoPregunta");
                    let editImgQuest = $("<input>");
                    $(editImgQuest).attr("type", "file");
                    $(editImgQuest).attr("name", data[0].id_encuesta + "Q" + (i + 1));
                    $(editImgQuest).attr("accept", "image/*");
                    let submitImgQuest = $("<input>");
                    $(submitImgQuest).attr("type", "submit");
                    $(submitImgQuest).attr("value", "Editar Img");
                    $(formImgQuest).append(imgQuest, editImgQuest, submitImgQuest);
                    let respuestas = $("<div>");
                    $(respuestas).addClass("respuestas");
                    for (let k = 0; k < 10; k++) {
                        if (data[i + 1]["id_Respuesta" + (k + 1)] != null) {
                            let formResp = $("<form>");
                            $(formResp).attr("action", "../dynamics/php/editText.php");
                            $(formResp).attr("method", "post");
                            let formImgResp = $("<form>");
                            $(formImgResp).attr("action", "../dynamics/php/editImg.php");
                            $(formImgResp).attr("method", "post");
                            $(formImgResp).attr("enctype", "multipart/form-data");
                            let respuesta = $("<div>");
                            $(respuesta).addClass("respuesta");
                            let radio = $("<input>");
                            $(radio).attr("type", "text");
                            $(radio).attr("name", data[0].id_encuesta + "Q" + (i + 1) + "R" + k);
                            let btnEditResp = $("<input>");
                            $(btnEditResp).attr("type", "submit");
                            $(btnEditResp).attr("value", "Editar");
                            let imgResp = $("<img>");
                            $(imgResp).attr("id", id_Resp);
                            $(imgResp).addClass("imgRespuesta");
                            let inpImgResp = $("<input>");
                            $(inpImgResp).attr("type", "file");
                            $(inpImgResp).attr("name", data[0].id_encuesta + "Q" + (i + 1) + "R" + k);
                            $(inpImgResp).attr("accept", "image/*");
                            let submitImgResp = $("<input>");
                            $(submitImgResp).attr("type", "submit");
                            $(submitImgResp).attr("value", "Editar Img");
                            let editImgResp = $("<input>");
                            $(editImgResp).attr("")
                            let span = $("<span>");
                            $(span).text(getResp(data, data[i + 1]["id_Respuesta" + (k + 1)]));
                            $(formResp).append(radio, btnEditResp, span);
                            $(formImgResp).append(imgResp, inpImgResp, submitImgResp);
                            $(respuesta).append(formImgResp, formResp);
                            $(respuestas).append(respuesta);
                        }
                        id_Resp++;
                    }
                    $(pregunta).append(formQuest, formImgQuest, respuestas);
                    $($("#enviarForm").parent()).before(pregunta);
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
                for (let i = 0; i < 5; i++) {
                    if (dataImg[i] == "null") {
                        //$($($("#cont-encuesta").children()[i + 1]).children()[1]).remove();
                    } else {
                        $($($($("#cont-encuesta").children()[i + 1]).children()[1]).children()[0]).attr("src", "../statics/img/fotosQuest/" + data[i + 1].id_pregunta + "." + dataImg[i]);
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
                        }
                        l++;
                    }
                }
            });
        }
    });
})

function getResp(info, id) {
    let regreso = null;
    for (let i = 0; i < info.length; i++) {
        if (info[i].id_Respuesta == id) {
            regreso = info[i].Respuesta;
        }
    }
    return regreso;
}