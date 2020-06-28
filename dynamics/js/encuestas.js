function getEncPropias() {
    fetch("../dynamics/php/getEncuestas.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let div = $("<div>");
            $(div).addClass("encuesta CuartoColor encPropia");
            $(div).data("id-encuesta", data[i].id_encuesta);
            $(div).on("click", () => {
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "respEncuesta.html";
            })
            let h4 = $("<h4>");
            $(h4).text(data[i].Titulo);
            let h5 = $("<h5>");
            $(h5).text(data[i].id_encuesta);
            let editar = $("<div>");
            $(editar).addClass("btn-editar Terciario");
            $(editar).on("click", (e) => {
                e.stopPropagation();
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "editarEncuestas.html";
            });
            let icono = $("<i>");
            $(icono).addClass("fas fa-pen");
            $(editar).append(icono);
            $(div).append(h4, h5, editar);
            $("#agregarEncuesta").before(div);
            colorearPaleta();
        }

    }).catch((error) => {
        console.log(error);
    })
}

function getEncPub() {
    $(".encPub").remove();
    let datos = new FormData(document.getElementById("form-buscar"));
    fetch("../dynamics/php/getEncPub.php", {
        method: "post",
        body: datos
    }).then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let div = $("<div>");
            $(div).addClass("encuesta CuartoColor encPub");
            $(div).data("id-encuesta", data[i].id_encuesta);
            $(div).on("click", () => {
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "respEncuesta.html";
            })
            let h4 = $("<h4>");
            $(h4).text(data[i].Titulo);
            let h5 = $("<h5>");
            $(h5).text(data[i].id_encuesta);
            let editar = $("<div>");
            $(editar).addClass("btn-editar Terciario");
            $(editar).on("click", (e) => {
                e.stopPropagation();
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "plantillaEncuesta.html";
            });
            let icono = $("<i>");
            $(icono).addClass("fas fa-recycle");
            $(editar).append(icono);
            $(div).append(h4, h5, editar);
            $("#encuestas").append(div);
            colorearPaleta();
        }
    }).catch((error) => {
        console.log(error);
    })
}

function getEncCont() {
    $(".encCont").remove();
    fetch("../dynamics/php/getEncCont.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let div = $("<div>");
            $(div).addClass("encuesta CuartoColor encCont");
            $(div).data("id-encuesta", data[i].id_encuesta);
            $(div).on("click", () => {
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "respEncuesta.html";
            })
            let h4 = $("<h4>");
            $(h4).text(data[i].Titulo);
            let h5 = $("<h5>");
            $(h5).text(data[i].id_encuesta);
            let editar = $("<div>");
            $(editar).addClass("btn-editar Terciario");
            $(editar).on("click", (e) => {
                e.stopPropagation();
                document.cookie = "encuesta=" + $(div).data("id-encuesta");
                document.location = "reportarEncuestas.html";
            });
            let icono = $("<i>");
            $(icono).addClass("far fa-angry");
            $(editar).append(icono);
            $(div).append(h4, h5, editar);
            $("#encuestas").append(div);
            colorearPaleta();
        }

    }).catch((error) => {
        console.log(error);
    })
}

$(document).ready(() => {
    $("#tabRegistro").on("click", () => {
        $(".barraEncuesta").removeClass("Principal");
        $(".barraEncuesta").addClass("CuartoColor");
        $("#tabRegistro").addClass("Principal");
        $("#tabRegistro").removeClass("CuartoColor");
        $(".encPub").css("display", "flex");
        colorearPaleta();
        $("#barraBusqueda").css("display", "flex");
        $(".encPropia").css("display", "none");
        $("#agregarEncuesta").css("display", "none");
        $(".encCont").css("display", "none");
    })
    $("#tabInicio").on("click", () => {
        $(".barraEncuesta").removeClass("Principal");
        $(".barraEncuesta").addClass("CuartoColor");
        $("#tabInicio").addClass("Principal");
        $("#tabInicio").removeClass("CuartoColor");
        $(".encPropia").css("display", "flex");
        $(".encPub").css("display", "none");
        colorearPaleta();
        $("#barraBusqueda").css("display", "none");
        $("#agregarEncuesta").css("display", "flex");
        $(".encCont").css("display", "none");
    });
    $("#tabContestadas").on("click", () => {
        $(".barraEncuesta").removeClass("Principal");
        $(".barraEncuesta").addClass("CuartoColor");
        $("#tabContestadas").addClass("Principal");
        $("#tabContestadas").removeClass("CuartoColor");
        $(".encPropia").css("display", "none");
        $(".encPub").css("display", "none");
        colorearPaleta();
        $("#barraBusqueda").css("display", "none");
        $("#agregarEncuesta").css("display", "none");
        $(".encCont").css("display", "flex");
        getEncCont();
    });
    $("#agregarEncuesta").on("click", () => {
        window.location = "crearEncuesta.html";
    });
    $("#btn-buscar").on("click", (e) => {
        e.preventDefault();
        getEncPub();
    })
    getEncPropias();
    let hoy = new Date();
    hoy.setTime(hoy.getTime() - 1);
    document.cookie = "contestada=0;expires=" + hoy.toGMTString();
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
    })
})