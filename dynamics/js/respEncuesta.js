$(document).ready(() => {
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
        let id_Resp = 0;
        $("#titulo-encuesta").text(data[0].Titulo);
        $("#descripcion-encuesta").text(data[0].Descripcion);
        for (let i = 0; i < 5; i++) {
            let pregunta = $("<div>");
            $(pregunta).addClass("pregunta CuartoColor");
            let h5Quest = $("<h5>");
            $(h5Quest).text(data[i + 1].Pregunta);
            let imgQuest = $("<img>");
            $(imgQuest).addClass("fotoPregunta");
            let respuestas = $("<div>");
            $(respuestas).addClass("respuestas");
            for (let k = 0; k < 10; k++) {
                if (data[i + 1]["id_Respuesta" + (k + 1)] != null) {
                    let respuesta = $("<div>");
                    $(respuesta).addClass("respuesta");
                    let radio = $("<input>");
                    $(radio).attr("type", "radio");
                    $(radio).attr("name", "Respuestas" + (i + 1));
                    $(radio).attr("value", k);
                    let imgResp = $("<img>");
                    $(imgResp).attr("id", id_Resp);
                    $(imgResp).addClass("imgRespuesta");
                    let span = $("<span>");
                    $(span).text(getResp(data, data[i + 1]["id_Respuesta" + (k + 1)]));
                    $(respuesta).append(radio, imgResp, span);
                    $(respuestas).append(respuesta);
                }
                id_Resp++;
            }

            $(pregunta).append(h5Quest, imgQuest, respuestas);
            $("#enviarForm").before(pregunta);
            colorearPaleta();
        }
        let hidden = $("<input>");
        $(hidden).attr("type", "hidden");
        $(hidden).attr("value", data[0].id_encuesta);
        $(hidden).attr("name", "idEncuesta");
        $("#enviarForm").before(hidden);
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
            for (let i = 0; i < 5; i++) {
                if (dataImg[i] == "null") {
                    $($($("#cont-encuesta").children()[i + 1]).children()[1]).remove();
                } else {
                    $($($("#cont-encuesta").children()[i + 1]).children()[1]).attr("src", "../statics/img/fotosQuest/" + data[i + 1].id_pregunta + "." + dataImg[i]);
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
            console.log(dataResp);
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