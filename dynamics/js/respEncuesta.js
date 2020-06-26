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
        $("#titulo-encuesta").text(data[0].Titulo);
        $("#descripcion-encuesta").text(data[0].Descripcion);
        for (let i = 0; i < 5; i++) {
            let pregunta = $("<div>");
            $(pregunta).addClass("pregunta CuartoColor");
            let h5Quest = $("<h5>");
            $(h5Quest).text(data[i + 1].Pregunta);
            $.ajax({
                url: "../dynamics/php/extImgQuest.php",
                data: {
                    nomImg: data[i + 1].id_pregunta
                },
                dataType: "json",
                method: "post",
                error: (error) => {
                    console.log(error);
                }
            }).then((dataImg) => {
                if (dataImg != "null") {
                    let imgQuest = $("<img>");
                    $(imgQuest).attr("src", "../statics/img/fotosQuest/" + data[i + 1].id_pregunta + "." + dataImg);
                    $(pregunta).append(h5Quest, imgQuest);
                    console.log($(pregunta).children());
                }
            });
            let respuestas = $("<div>");
            $(respuestas).addClass("respuestas");
            for (let k = 0; k < 10; k++) {
                let respuesta = $("<div>");
                $(respuesta).addClass("respuesta");
                let radio = $("<input>");
                $(radio).attr("type", "radio");
                $(radio).attr("name", data[i + 1].id_pregunta);
                $(radio).attr("value", k + 1);
                let span = $("<span>");
                $(span).text("")
            }
        }
    });
})