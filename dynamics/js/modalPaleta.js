function abrirModal() {
    $(".modalCSS").css("animation", "aparecerModal 0.5s linear");
    $(".fade-body").css("animation", "aparecerFade 0.5s linear");
    setTimeout(() => {
        $(".modalCSS").css("display", "block");
        $(".fade-body").css("display", "block");
    }, 450);
}

$(document).ready(() => {
    let paleta = undefined;
    $("#Paleta1").on("click", () => {
        $(".paletaColor").removeClass("paletaSelecc");
        $("#Paleta1").addClass("paletaSelecc");
        paleta = 1;
    })
    $("#Paleta2").on("click", () => {
        $(".paletaColor").removeClass("paletaSelecc");
        $("#Paleta2").addClass("paletaSelecc");
        paleta = 2;
    })
    $("#Paleta3").on("click", () => {
        $(".paletaColor").removeClass("paletaSelecc");
        $("#Paleta3").addClass("paletaSelecc");
        paleta = 3;
    })
    $("#aceptarPaleta").on("click", () => {
        borrarCookie("Paleta");
        document.cookie = "Paleta=" + paleta;
    })
    $("#aceptarPaleta").on("click", () => {
        $(".modalCSS").css("animation", "desvanecerModal 0.5s linear");
        $(".fade-body").css("animation", "desvanecerFade 0.5s linear");
        setTimeout(() => {
            $(".modalCSS").css("display", "none");
            $(".fade-body").css("display", "none");
            colorearPaleta();
        }, 450);
    });
    $("#escogerPaleta").on("click", () => {
        abrirModal();
    })
})