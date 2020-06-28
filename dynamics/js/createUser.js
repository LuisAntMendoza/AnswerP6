$(document).ready(() => {
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
    $("#select-poder").on("change", () => {
        if ($("#select-poder").val() == 3) {
            $("#usuario").attr("pattern", "^[0-9]{9}$");
            $("#clave").attr("pattern", "^[A-Z]{4}[0-9]{6}(H|M)[A-Z0-9]{7}$");
        } else if ($("#select-poder").val() == 2 || $("#select-poder").val() == 1) {
            $("#usuario").attr("pattern", "^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$");
            $("#clave").attr("pattern", "^[0-9]{6}$");
        }
    })
})