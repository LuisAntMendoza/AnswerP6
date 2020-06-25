function crearPregunta() {
    if ($($("#encuesta").children()).length < 6) {
        let pregunta = $("<div>");
        $(pregunta).addClass("pregunta");
        let h4 = $("<h4>");
        $(h4).text("Ingrese su pregunta");
        let inpPregunta = $("<input>");
        $(inpPregunta).attr("type", "text");
        $(inpPregunta).attr("name", "pregunta");
        $(inpPregunta).attr("class", "inpPregunta");
        let respuestas = $("<div>");
        $(respuestas).addClass("respuestas");
        for (let i = 0; i < 2; i++) {
            let respuesta = $("<div>");
            $(respuesta).addClass("respuesta");
            let b = $("<b>");
            $(b).addClass("opcion")
            $(b).text("A");
            let inpRespuesta = $("<input>");
            $(inpRespuesta).attr("type", "text");
            let borrar = $("<button>");
            $(borrar).text("Borrar respuesta");
            $(borrar).on("click", (e) => {
                e.preventDefault();
                if ($($($($(e.target).parent()).parent()).children()).length > 3) {
                    console.log($($($($(e.target).parent()).parent()).children()).length);
                    $($(e.target).parent()).remove();
                }
            });
            $(respuesta).append(b, inpRespuesta, borrar);
            $(respuestas).append(respuesta);
        }
        let button = $("<button>");
        $(button).text("Agregar Respuesta");
        $(button).addClass("agregarResp");
        $(button).on("click", (e) => {
            if ($($($(e.target).parent()).children()).length < 11) {
                e.preventDefault();
                let b = $("<b>");
                $(b).text("A");
                let inpRespuesta = $("<input>");
                $(inpRespuesta).attr("type", "text");
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
                $(respuesta).append(b, inpRespuesta, borrar);
                $(e.target).before(respuesta);
            }
        });
        $(respuestas).append(button);
        $(pregunta).append(h4, inpPregunta, respuestas);
        $("#agregarQuest").before(pregunta);
    }
}

$("#agregarQuest").on("click", (e) => {
    e.preventDefault();
    crearPregunta();
})

crearPregunta();