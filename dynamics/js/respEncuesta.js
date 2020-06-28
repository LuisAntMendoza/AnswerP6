$(document).ready(() => {
    fetch("../dynamics/php/sesion.php").then((response) => {
        return response.json();
    }).then((data) => {
        if (data.usuario == null) {
            $("#cerrar-sesion").css("display", "none");
            $("#btn-usuario").text("Iniciar Sesión");
        } else {
            $("#btn-usuario").text("Bienvenid@: " + data.nombre);
            if (data.poder == 1) {
                $("#admin").css("display", "flex");
            }
            if (data.castigo == "true") {
                window.location = "inicio.html";
            }
        }
    }).catch((error) => {
        console.log(error);
    })
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
        if (data[0] == undefined) {
            window.location = "encuestas.html";
        }
        let fIni = new Date(data[0].FechaInicio);
        let fFin = new Date(data[0].FechaFinal);
        let hoy = new Date();
        let encContestada = undefined;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == false || data[i] == true) {
                encContestada = data[i];
            }
        }
        if (hoy - fIni < 0) {
            $("#antes").css("display", "block");
            $("#fInicio").text(fIni);
            $("#enviarForm").css("display", "none")
        } else if ((fFin - hoy < 0) || encContestada == true || valCookie("contestada") == "true") {
            $("#despues").css("display", "block");
            $("#enviarForm").css("display", "none")
            let canvas = document.getElementById("grafica-encuesta");
            let context = canvas.getContext("2d");
            for (let i = 0; i < 5; i++) {
                if (data.length > i + 1) {
                    if (typeof data[i + 1].id_pregunta == "string") {
                        let canvas = $("<canvas>");
                        $(canvas).addClass("grafica-encuesta");
                        $(canvas).attr("id", "canvas" + i);
                        $("#cont-canvas").append(canvas);
                        let obtCanvas = document.getElementById("canvas" + i);
                        let context = obtCanvas.getContext("2d");
                        let idRespuestas = [];
                        for (let k = 0; k < 5; k++) {
                            if (data[i + 1]["id_Respuesta" + (k + 1)] != null) {
                                idRespuestas.push(data[i + 1]["id_Respuesta" + (k + 1)]);
                            }
                        }
                        let arrRespuestas = [];
                        let arrVotos = [];
                        for (let k = 0; k < idRespuestas.length; k++) {
                            for (let m = 0; m < data.length; m++) {
                                if (data[m].id_Respuesta == idRespuestas[k]) {
                                    arrRespuestas.push(data[m].Respuesta);
                                    arrVotos.push(data[m].votos);
                                }
                            }
                        }
                        let grafica = new Chart(context, {
                            type: "pie",
                            data: {
                                labels: arrRespuestas,
                                datasets: [{
                                    data: arrVotos,
                                    backgroundColor: ["red", "green", "blue", "orange", "yellow", "purple", "lightskyblue", "pink", "lightgreen", "mediumpurple"]
                                }]
                            },
                            options: {
                                legend: {
                                    labels: {
                                        fontColor: "white"
                                    }
                                },
                                title: {
                                    display: true,
                                    text: data[i + 1].Pregunta,
                                    fontColor: "white"
                                }
                            }
                        });
                    }
                }
            }
        } else {
            let id_Resp = 0;
            $("#titulo-encuesta").text(data[0].Titulo);
            $("#descripcion-encuesta").text(data[0].Descripcion);
            for (let i = 0; i < 5; i++) {
                if (data.length > i + 1) {
                    if (typeof data[i + 1].id_pregunta == "string") {
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
                }
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
    $("#enviarForm").on("click", () => {
        document.cookie = "contestada=true";
    })
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