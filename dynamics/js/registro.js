$(document).ready(() => {
    $("#tab-alumno").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("CURP");
        $($($("#noUnam").parent()).children()[0]).text("Número de Cuenta");
        $("#contSelect").css("display", "inline-block");
    })
    $("#tab-profe").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("Número de Trabajador");
        $($($("#noUnam").parent()).children()[0]).text("RFC");
        $("#contSelect").css("display", "none");
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
        //console.log(data);
    }).catch((error) => {
        console.log(error.message);
    })
})
$(window).ready(function() {

    $(function() {
        $('#inp-img-registro').change(function(e) {
            addImage(e);
        });

        function addImage(e) {
            console.log("addImage");
            var file = e.target.files[0],
                imageType = /image.*/;
            console.log("if");
            if (!file.type.match(imageType))
                return;
            console.log("reader");
            var reader = new FileReader();
            console.log("onload");
            reader.onload = function(e) {
                console.log("funcion");
                var result = e.target.result;
                $('#img-registro').attr("src", result);
            }

            reader.readAsDataURL(file);
        }
    });
});