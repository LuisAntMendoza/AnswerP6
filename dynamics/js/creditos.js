function colorearBordes() {
    if (valCookie("Paleta") == 1) {
        $(".foto-integrante").css("border", "3px solid #A4A4A4");
    } else if (valCookie("Paleta") == 2) {
        $(".foto-integrante").css("border", "3px solid #6F6B99");
    } else if (valCookie("Paleta") == 3) {
        $(".foto-integrante").css("border", "3px solid #727272");
    }
}

$(document).ready(() => {
    colorearBordes();
    $("#aceptarPaleta").on("click", () => {
        setTimeout(colorearBordes, 450);
    })
    $("#git-luis").on("click", () => {
        window.open("https://github.com/LuisAntMendoza");
    });
    $("#git-cris").on("click", () => {
        window.open("https://github.com/CristianUmAg");
    });
    $("#git-emi").on("click", () => {
        window.open("https://github.com/Emilianole6312");
    });
    $("#git-gabo").on("click", () => {
        window.open("https://github.com/Gaborivas22");
    });
    $("#git-jose").on("click", () => {
        window.open("https://github.com/juarezzjose");
    });
})