function valCookie(nombre) {
    let regreso = undefined;
    let cookies = document.cookie;
    let arrCookies = cookies.split("; ");
    let arrCookies2 = [];
    for (let i = 0; i < arrCookies.length; i++) {
        arrCookies2.push(arrCookies[i].split("=")[0]);
        arrCookies2.push(arrCookies[i].split("=")[1]);
    }
    let indice = arrCookies2.indexOf(nombre);
    if (indice == -1) {
        regreso = null;
    } else {
        regreso = arrCookies2[indice + 1]
    }
    return regreso;
}

function colorearPaleta() {
    if (valCookie("Paleta") == 1) {
        $(".Principal").css("background-color", "#F2F2F2");
        $(".Secundario").css("background-color", "#B3B3B3");
        $(".Terciario").css("background-color", "#7F7F7F");
        $(".CuartoColor").css("background-color", "#A4A4A4");
        console.log("modal 1");
    } else if (valCookie("Paleta") == 2) {
        $(".Principal").css("background-color", "#9D98D9");
        $(".Secundario").css("background-color", "#413E59");
        $(".Terciario").css("background-color", "#252433");
        $(".CuartoColor").css("background-color", "#6F6B99");
        console.log("modal 2");
    } else if (valCookie("Paleta") == 3) {
        $(".Principal").css("background-color", "#828282");
        $(".Secundario").css("background-color", "#525252");
        $(".Terciario").css("background-color", "#383838");
        $(".CuartoColor").css("background-color", "#727272");
        console.log("modal 3");
    }
}

$(document).ready(() => {
    if (valCookie("Paleta") == 1) {
        $(".Principal").css("background-color", "#F2F2F2");
        $(".Secundario").css("background-color", "#B3B3B3");
        $(".Terciario").css("background-color", "#7F7F7F");
        $(".CuartoColor").css("background-color", "#B3B3B3");
        console.log("modal 1");
    } else if (valCookie("Paleta") == 2) {
        $(".Principal").css("background-color", "#9D98D9");
        $(".Secundario").css("background-color", "#413E59");
        $(".Terciario").css("background-color", "#252433");
        $(".CuartoColor").css("background-color", "#6F6B99");
        console.log("modal 2");
    } else if (valCookie("Paleta") == 3) {
        $(".Principal").css("background-color", "#828282");
        $(".Secundario").css("background-color", "#525252");
        $(".Terciario").css("background-color", "#383838");
        $(".CuartoColor").css("background-color", "#525252");
        console.log("modal 3");
    } else {
        abrirModal();
    }
})