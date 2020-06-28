function borrarCookies() {
    let hoy = new Date();
    hoy.setTime(hoy.getTime() - 1);
    document.cookie = "usuario=0;expires" + hoy.toGMTString();
}

$(document).ready(() => {
    borrarCookies();
    fetch("../dynamics/php/getAdminData.php").then((response) => {
        return response.json();
    }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let tr = $("<tr>");
            for (let k = 1; k < 6; k++) {
                let td = $("<td>");
                $(td).text(data[i][k]);
                $(tr).append(td);
            }
            let tdVisita = $("<td>");
            let visita = $("<i>");
            $(visita).addClass("fas fa-user");
            $(visita).data("idUser", data[i][0]);
            $(visita).on("click", () => {
                document.cookie = "usuario=" + $(visita).data("idUser");
                window.location = "verPerfil.html";
            })
            let bloqueado = $("<td>");
            if (data[i][13] == null) {
                $(bloqueado).text("No");
            } else {
                $(bloqueado).text("Si");
            }
            $(tdVisita).append(visita);
            let tdBlock = $("<td>");
            let block = $("<i>");
            $(block).addClass("fas fa-ban");
            $(block).on("click", () => {
                $.ajax({
                    url: "../dynamics/php/blockUser.php",
                    data: {
                        idUser: data[i][0]
                    },
                    dataType: "json",
                    method: "post",
                    error: (error) => {
                        console.log(error);
                    }
                }).then(() => {
                    window.location.reload();
                })
            })
            $(tdBlock).append(block);
            let tdTrash = $("<td>");
            let trash = $("<i>");
            $(trash).addClass("fas fa-trash-alt");
            $(trash).on("click", () => {
                $.ajax({
                    url: "../dynamics/php/deleteUser.php",
                    data: {
                        idUser: data[i][0]
                    },
                    dataType: "json",
                    method: "post",
                    error: (error) => {
                        console.log(error);
                    }
                }).then(() => {
                    window.location.reload();
                })
            })
            $(tdTrash).append(trash);
            $(tr).append(tdVisita, bloqueado, tdBlock, tdTrash);
            $("#cuerpo-usuario").append(tr);
        }
    }).catch((error) => {
        console.log(error);
    });
    fetch("../dynamics/php/getCategoria.php").then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let tr = $("<tr>");
            let categoria = $("<td>");
            $(categoria).text(data[i].Categoria);
            let tdTrash = $("<td>");
            let trash = $("<i>");
            $(trash).addClass("fas fa-trash-alt");
            $(trash).on("click", () => {
                $.ajax({
                    url: "../dynamics/php/deleteCat.php",
                    data: {
                        idCategoria: data[i].id_categoria
                    },
                    dataType: "json",
                    method: "post",
                    error: (error) => {
                        console.log(error);
                    }
                }).then(() => {
                    window.location.reload();
                })
            })
            $(tdTrash).append(trash);
            $(tr).append(categoria, tdTrash);
            $("#cuerpo-categoria").append(tr);
        }
    }).catch((error) => {
        console.log(error);
    });
    fetch("../dynamics/php/getEncAdmin.php").then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let tr = $("<tr>");
            let titulo = $("<td>");
            $(titulo).text(data[i][1]);
            let descripcion = $("<td>");
            $(descripcion).text(data[i][2]);
            let tdEdit = $("<td>");
            let edit = $("<i>");
            $(edit).addClass("fas fa-file-alt");
            $(edit).on("click", () => {
                document.cookie = "encuesta=" + data[i][0];
                window.location = "editarEncuestas.html";
            })
            $(tdEdit).append(edit);
            $(tr).append(titulo, descripcion, tdEdit);
            $("#cuerpo-encuestas").append(tr);
        }
    }).catch((error) => {
        console.log(error);
    })
    fetch("../dynamics/php/getReportes.php").then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let tr = $("<tr>");
            let razon = $("<td>");
            $(razon).text(data[i][1]);
            let encuesta = $("<td>");
            $(encuesta).text(data[i][2]);
            let tdTrash = $("<td>");
            let trash = $("<i>");
            $(trash).addClass("fas fa-trash-alt");
            $(trash).on("click", () => {
                $.ajax({
                    url: "../dynamics/php/deleteReporte.php",
                    data: {
                        idReporte: data[i][0]
                    },
                    dataType: "json",
                    method: "post",
                    error: (error) => {
                        console.log(error);
                    }
                }).then(() => {
                    window.location.reload();
                })
            })
            $(tdTrash).append(trash);
            $(tr).append(razon, encuesta, tdTrash);
            $("#cuerpo-reportes").append(tr);
        }
    }).catch((error) => {
        console.log(error);
    })
    $("#crear-user").on("click", () => {
        window.location = "crearUser.html";
    })
});