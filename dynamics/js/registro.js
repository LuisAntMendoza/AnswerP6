$(document).ready(() => {
    $("#tab-alumno").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("CURP");
        $($($("#claveUn").parent()).children()[1]).attr("pattern", "^[A-Z]{4}\d{6}(H|M)[A-Z0-9]{7}$");
        $($($("#noUnam").parent()).children()[0]).text("Número de Cuenta");
        $($($("#noUnam").parent()).children()[1]).attr("pattern", "^[0-9]{9}$");
        $("#contSelect").css("display", "inline-block");
    })
    $("#tab-profe").on("click", () => {
        $(".tabRegistro").toggleClass("Terciario CuartoColor");
        colorearPaleta();
        $($($("#claveUn").parent()).children()[0]).text("Número de Trabajador");
        $($($("#claveUn").parent()).children()[1]).attr("pattern", "^[0-9]{6}$");
        $($($("#noUnam").parent()).children()[0]).text("RFC");
        $($($("#noUnam").parent()).children()[1]).attr("pattern", "^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$");
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
            var file = e.target.files[0],
                imageType = /image.*/;
            if (!file.type.match(imageType))
                return;
            var reader = new FileReader();
            reader.onload = function(e) {
                var result = e.target.result;
                $('#img-registro').attr("src", result);
            }

            reader.readAsDataURL(file);
        }
    });
});