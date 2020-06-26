function getEncPropias() {
    fetch("../dynamics/php/getEncuestas.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let div = $("<div>");
            $(div).addClass("encuesta CuartoColor encPropia");
            let h4 = $("<h4>");
            $(h4).text(data[i].Titulo);
            $(div).append(h4);
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
            let h4 = $("<h4>");
            $(h4).text(data[i].Titulo);
            $(div).append(h4);
            $("#encuestas").append(div);
            colorearPaleta();
        }
    }).catch((error) => {
        console.log(error);
    })
}

$(document).ready(() => {
    $("#tabRegistro").on("click", () => {
        $(".barraEncuesta").toggleClass("Principal CuartoColor");
        $(".encPub").css("display", "flex");
        colorearPaleta();
        $("#barraBusqueda").css("display", "flex");
        $(".encPropia").css("display", "none");
        $("#agregarEncuesta").css("display", "none");
    })
    $("#tabInicio").on("click", () => {
        $(".barraEncuesta").toggleClass("Principal CuartoColor");
        $(".encPropia").css("display", "flex");
        $(".encPub").css("display", "none");
        colorearPaleta();
        $("#barraBusqueda").css("display", "none");
        $("#agregarEncuesta").css("display", "flex");
    });
    $("#agregarEncuesta").on("click", () => {
        window.location = "crearEncuesta.html";
    });
    $("#btn-buscar").on("click", (e) => {
        e.preventDefault();
        getEncPub();
    })
    getEncPropias();
    fetch("../dynamics/php/getCategoria.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let option = $("<option>");
            $(option).attr("value", data[i]["id_categoria"]);
            $(option).text(data[i]["Categoria"]);
            $("#select-categoria").append(option);
        }
        //console.log(data);
    }).catch((error) => {
        console.log(error.message);
    })
})