$(document).ready(() => {
    $("#tab-alumno").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("CURP");
        $($($("#noUnam").parent()).children()[0]).text("Número de Cuenta");
    })
    $("#tab-profe").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("RFC");
        $($($("#noUnam").parent()).children()[0]).text("Número de Trabajador");
    })
    $("#tabRegistro").on("click", () => {
        $(".barraSesion").toggleClass("Principal CuartoColor");
        colorearPaleta();
        $("#form-registro").css("display", "flex");
        $("#form-inicio").css("display", "none");
    })
    $("#tabInicio").on("click", () => {
        $(".barraSesion").toggleClass("Principal CuartoColor");
        colorearPaleta();
        $("#form-registro").css("display", "none");
        $("#form-inicio").css("display", "flex");
    })
})