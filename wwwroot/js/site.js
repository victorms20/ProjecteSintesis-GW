// ACTIVITAT 1 - REINO NUMEROS

var contador = 0;
var vidas_a1 = 4;
var addheart = 0;
var Acabadobien;
var progres_A3;
var progreso = 0;
var base = "http://192.168.14.102:5000";


$(document).ready(function () {
    //ACTIVIDAD 2 REINO NUMEROS
    var app = {

        cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
        init: function () {
            app.shuffle();
        },
        shuffle: function () {
            var random = 0;
            var temp = 0;
            for (i = 1; i < app.cards.length; i++) {
                random = Math.round(Math.random() * i);
                temp = app.cards[i];
                app.cards[i] = app.cards[random];
                app.cards[random] = temp;
            }
            app.assignCards();
        },
        assignCards: function () {
            $('.card').each(function (index) {
                $(this).attr("data-card-value", app.cards[index]);
            });
            app.clickHandlers();
        },
        clickHandlers: function () {
            $('.card').on('click', function () {
                $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
                app.checkMatch();

                if ($(this).text() == 1) {
                    $(".audio1")[0].play();
                } else if ($(this).text() == 2) {
                    $(".audio2")[0].play();
                } else if ($(this).text() == 3) {
                    $(".audio3")[0].play();
                } else if ($(this).text() == 4) {
                    $(".audio4")[0].play();
                } else if ($(this).text() == 5) {
                    $(".audio5")[0].play();
                } else if ($(this).text() == 6) {
                    $(".audio6")[0].play();
                }
            });
        },
        checkMatch: function () {
            if ($('.selected').length === 2) {
                if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
                    $('.selected').each(function () {
                        $(this).animate({
                            opacity: 2
                        }).removeClass('unmatched');
                        $(this).css("background", "linear-gradient(to bottom right, #2A7F26, #0AFF00)");
                    });
                    $('.selected').each(function () {
                        $(this).removeClass('selected');
                    });
                    app.checkWin()
                    if (vidas_a1 > 4) {
                        vidas_a1 = 4;
                    } else {
                        vidas_a1++;
                        addheart++;
                        if (addheart % 2 == 0 && $(".vh").length <= 4) {
                            $(".vidas").append("<div class='vh'><img class='heart' src='https://vignette.wikia.nocookie.net/supermarioguias/images/7/74/8_bit_heart_stock_by_xquatrox-d4r844m.png/revision/latest?cb=20150901225402&path-prefix=es'></div>");
                        }
                    }
                    contador = contador + 110;
                    $('.PNumerosA').css("width", contador);
                    if (contador == 330) {
                        $(".PNumerosA").attr("class", "progress-bar progress-bar-success progress-bar-striped active PNumerosA");
                    } else if (contador == 660) {
                        $(".PNumerosA").attr("class", "progress-bar progress-bar-warning progress-bar-striped active PNumerosA");
                    }

                    if (contador > 300) {
                        $(".animateheroe").remove();
                        $(".animacionheroe").html(" <img class='animateheroe' src='https://media.giphy.com/media/lKpRarNCyYmY82HIRn/giphy.gif' />");
                        $(".textoheroe").css("background-size", "100% 100%");
                        $(".textoheroe").html("<p>Segueix així!</p>")
                        var explode = function () {
                            $(".textoheroe").html("");
                            $(".animateheroe").remove();
                            $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/mUNRAo/heroe.png'>");
                            $(".textoheroe").css("background-size", "0 0");
                        };
                        setTimeout(explode, 5000);
                    }

                    if ($(".vh").length != 0 && contador == 660) {
                        $("#mostrarmodal").modal("show");
                        $(".animacionmodal").empty();
                        $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                        $(".base").hide();
                    }
                    Acabadobien = true;
                }
                else {
                    setTimeout(function () {
                        $('.selected').each(function () {
                            $(this).html(' ').removeClass('selected');
                        });
                        $(".vidas div:last-child").remove();

                        if ($(".vh").length == 3) {
                            $(".animateheroe").remove();
                            $(".animacionheroe").html(" <img class='animateheroe' src='https://media.giphy.com/media/lKpRarNCyYmY82HIRn/giphy.gif' />");
                            $(".textoheroe").css("background-size", "100% 100%");
                            $(".textoheroe").html("<p>Tranquil! No desesperis, encara tenim més oportunitats!</p>")
                            var explode = function () {
                                $(".textoheroe").html("");
                                $(".animateheroe").remove();
                                $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/mUNRAo/heroe.png'>");
                                $(".textoheroe").css("background-size", "0 0");
                            };
                            setTimeout(explode, 5000);
                        } else if ($(".vh").length == 1) {
                            $(".animateheroe").remove();
                            $(".animacionheroe").html(" <img class='animateheroe' src='https://media.giphy.com/media/lKpRarNCyYmY82HIRn/giphy.gif' />");
                            $(".textoheroe").css("background-size", "100% 100%");
                            $(".textoheroe").html("<p>Encara ens queda una última oportunitat!</p>")
                            var explode = function () {
                                $(".textoheroe").html("");
                                $(".animateheroe").remove();
                                $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/mUNRAo/heroe.png'>");
                                $(".textoheroe").css("background-size", "0 0");
                            };
                            setTimeout(explode, 5000);
                        }
                        if (vidas_a1 != 0) {
                            vidas_a1--;
                        }
                        if ($(".vh").length == 0 && contador < 330) {
                            $("#mostrarmodal").modal("show");
                            $(".animacionmodal").empty();
                            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                            $(".base").hide();
                        } else if ($(".vh").length == 0 && contador >= 330) {
                            $("#mostrarmodal").modal("show");
                            $(".animacionmodal").empty();
                            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                            $(".base").hide();
                        }
                    }, 500);
                    Acabadobien = false;
                }
            }
        },
        checkWin: function () {}

    };
    app.init();

});

$(document).ready(function () {
    // ACTIVIDAD 1 REINO NUMEROS
    for (var i = 0; i <= 4; i++) {
        $(".r" + i).attr("disabled", false);
    }

    var alargada = $('.resultado').length;
    var pantalla = $(".pres").text();
    var resultado;

    if (pantalla == "ONE") {
        resultado = 1;
    }
    var alargada = $('.resultado').length;

    // Conjunto de elementos validos a obtener
    var elementos = "23456";

    $(".numeroclicat1").text(getRandom());
    $(".numeroclicat2").text(getRandom());
    $(".numeroclicat3").text(getRandom());
    $(".numeroclicat4").text(getRandom());

    function getRandom() {
        // posición aleatoria del elemento que va a ser elegido
        var posicion = 0 + Math.floor(Math.random() * elementos.length);

        // captura del elemento de la posición seleccionada
        var num = elementos.charAt(posicion);

        // Eliminar elemento del conjunto para no repetirlo
        elementos = elementos.replace(num, "");

        return num;
    }

    var random_numero1 = Math.floor(Math.random() * 4) + 1;
    $(".numeroclicat" + random_numero1).text("1");

    $(".r1").click(function () {
        if ($(this).text() == resultado) {
            $(".audio")[0].play();
            $(".numeroclicat1").css("color", "green");
            $(".PNumerosA2").css("width", 100 + "%");
            $(".PNumerosA2").attr("class", "progress-bar progress-bar-warning progress-bar-striped active PNumerosA2");
            $("#mostrarmodal").modal("show");
            $(".animacionmodal").empty();
            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
            $(".base").hide();
            Acabadobien = true;
        } else {
            $(".vidas2 div:last-child").remove();
            $(this).attr("disabled", true);
            if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".base").hide();
                Acabadobien = false;
            } else if ($(".vh").length < 3) {
                $(".animateheroe").remove();
                $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/HeroePrincipal.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Tranquil! No desesperis, encara tenim més oportunitats!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
        }
    });

    $(".r2").click(function () {
        if ($(this).text() == resultado) {
            $(".audio")[0].play();
            $(".numeroclicat2").css("color", "green");
            $('.PNumerosA2').css("width", 100 + "%");
            $(".PNumerosA2").attr("class", "progress-bar progress-bar-warning progress-bar-striped active PNumerosA2");
            $("#mostrarmodal").modal("show");
            $(".animacionmodal").empty();
            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
            $(".base").hide();
            Acabadobien = true;
        } else {
            $(".vidas2 div:last-child").remove();
            $(this).attr("disabled", true);
            if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".base").hide();
                Acabadobien = false;
            } else if ($(".vh").length < 3) {
                $(".animateheroe").remove();
                $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/HeroePrincipal.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Tranquil! No desesperis, encara tenim més oportunitats!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
        }
    });

    $(".r3").click(function () {
        if ($(this).text() == resultado) {
            $(".audio")[0].play();
            $(".numeroclicat3").css("color", "green");
            $('.PNumerosA2').css("width", 100 + "%");
            $(".PNumerosA2").attr("class", "progress-bar progress-bar-warning progress-bar-striped active PNumerosA2");
            $("#mostrarmodal").modal("show");
            $(".animacionmodal").empty();
            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
            $(".base").hide();
            Acabadobien = true;
        } else {
            $(".vidas2 div:last-child").remove();
            $(this).attr("disabled", true);
            if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".base").hide();
                Acabadobien = false;
            } else if ($(".vh").length < 3) {
                $(".animateheroe").remove();
                $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/HeroePrincipal.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Tranquil! No desesperis, encara tenim més oportunitats!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
        }
    });

    $(".r4").click(function () {
        if ($(this).text() == resultado) {
            $(".audio")[0].play();
            $(".numeroclicat4").css("color", "green");
            $('.PNumerosA2').css("width", 100 + "%");
            $(".PNumerosA2").attr("class", "progress-bar progress-bar-warning progress-bar-striped active PNumerosA2");
            $("#mostrarmodal").modal("show");
            $(".animacionmodal").empty();
            $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
            $(".base").hide();
        } else {
            $(".vidas2 div:last-child").remove();
            $(this).attr("disabled", true);
            if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".base").hide();
                Acabadobien = false;
            } else if ($(".vh").length < 3) {
                $(".animateheroe").remove();
                $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/HeroePrincipal.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Tranquil! No desesperis, encara tenim més oportunitats!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='css/imatges/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
        }
    });

});

$(document).ready(function () {
    // ACTIVIDAD 3 REINO NUMEROS
    var elementosN = "123456789";
    var resultado;
    var opcion1;
    var opcion2;
    var opcion2_res;
    var contador_echobien = 0;

    $(".div11").text(getRandom());
    $(".div12").text(getRandom());
    $(".div13").text(getRandom());
    $(".div14").text(getRandom());

    function getRandom() {
        // posición aleatoria del elemento que va a ser elegido
        var posicion = 0 + Math.floor(Math.random() * elementosN.length);

        // captura del elemento de la posición seleccionada
        var num = elementosN.charAt(posicion);

        // Eliminar elemento del conjunto para no repetirlo
        elementosN = elementosN.replace(num, "");

        return num;
    }

    var elementosL = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']
    var numerosselect = [];
    var pos = "0123";

    for (var i = 1; i <= 4; i++) {
        if ($(".div1" + i).text() == 1) {
            numerosselect.push("ONE")
        } else if ($(".div1" + i).text() == 2) {
            numerosselect.push("TWO")
        } else if ($(".div1" + i).text() == 3) {
            numerosselect.push("THREE")
        } else if ($(".div1" + i).text() == 4) {
            numerosselect.push("FOUR")
        } else if ($(".div1" + i).text() == 5) {
            numerosselect.push("FIVE")
        } else if ($(".div1" + i).text() == 6) {
            numerosselect.push("SIX")
        } else if ($(".div1" + i).text() == 7) {
            numerosselect.push("SEVEN")
        } else if ($(".div1" + i).text() == 8) {
            numerosselect.push("EIGHT")
        } else if ($(".div1" + i).text() == 9) {
            numerosselect.push("NINE")
        }
    }

    for (var i = 1; i <= numerosselect.length; i++) {
        var randomposi = getRandomP();
        $(".div2" + i).text(numerosselect[randomposi]);
    }

    function getRandomP() {
        // posición aleatoria del elemento que va a ser elegido
        var posicion = 0 + Math.floor(Math.random() * pos.length);

        // captura del elemento de la posición seleccionada
        var num = pos.charAt(posicion);

        // Eliminar elemento del conjunto para no repetirlo
        pos = pos.replace(num, "");

        return num;
    }
    $(".resultado3").attr("disabled", true);

    for (var i = 1; i <= 4; i++) {
        $(".div1" + i).click(function () {
            opcion1 = $(this).text();
            $(this).css("border", "5px solid red")
            $(".resultado2").attr("disabled", true);
            $(".resultado3").attr("disabled", false);
        });
        var elementosL = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']

        $(".div2" + i).click(function () {
            opcion2 = $(this).text();
            $(this).css("border", "5px solid red");
            $(".resultado3").attr("disabled", true);
            if (opcion2 == "ONE") {
                opcion2_res = 1;
            } else if (opcion2 == "TWO") {
                opcion2_res = 2;
            } else if (opcion2 == "THREE") {
                opcion2_res = 3;
            } else if (opcion2 == "FOUR") {
                opcion2_res = 4;
            } else if (opcion2 == "FIVE") {
                opcion2_res = 5;
            } else if (opcion2 == "SIX") {
                opcion2_res = 6;
            } else if (opcion2 == "SEVEN") {
                opcion2_res = 7;
            } else if (opcion2 == "EIGHT") {
                opcion2_res = 8;
            } else if (opcion2 == "NINE") {
                opcion2_res = 9;
            }
            
            if (opcion1 == opcion2_res) {
                $(".resultado2").attr("disabled", false);
                $(".resultado3").attr("disabled", true);
                $(".animacionfinal").html(" <img class='animatefinal' src='https://media.giphy.com/media/YXiQyUm0ADA8sKlsew/giphy.gif' />");
                var explode = function () {
                    $(".animacionfinal").html("");
                    $(".animatefinal").remove();
                    $(".animacionfinal").html("<img class='animatefinal' src='https://image.ibb.co/h6GWwT/Imagen_Inicial.png' />");
                };
                setTimeout(explode, 2500);
                contador_echobien++;
                if (contador_echobien == 4 && $(".vh").length > 0) {
                    $("#mostrarmodal").modal("show");
                    $(".animacionmodal").empty();
                    $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                    $(".base2").hide();
                }
                progres_A3 = progres_A3 + 25;
            } else {
                progreso = 0;
                $(".vidas2 div:last-child").remove();
                $(".resultado2").attr("disabled", false);
                $(".resultado3").attr("disabled", true);
                $(".animacionfinal").html(" <img class='animatefinal' src='https://media.giphy.com/media/SILblTO6uyYI29re6x/giphy.gif' />");
                var explode = function () {
                    $(".animacionfinal").html("");
                    $(".animatefinal").remove();
                    $(".animacionfinal").html("<img class='animatefinal' src='https://image.ibb.co/h6GWwT/Imagen_Inicial.png' />");
                };
                setTimeout(explode, 3000);
                if ($(".vh").length == 0) {
                    $("#mostrarmodal").modal("show");
                    $(".animacionmodal").empty();
                    $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                    $(".base2").hide();
                    Acabadobien = false;
                }
            }
        });
    }

    $(".resultado2").on( "click", function() {     
        resultado = $(this).text();
     });

     $(".resultado3").on( "click", function() {
        if (resultado == opcion2_res) {
            $(this).css("visibility","hidden");
            if ($(".div11").text() == resultado) {
                $(".div11").css("visibility","hidden");
            } else if ($(".div12").text() == resultado) {
                $(".div12").css("visibility","hidden");
            } else if ($(".div13").text() == resultado) {
                $(".div13").css("visibility","hidden");
            } else if ($(".div14").text() == resultado) {
                $(".div14").css("visibility","hidden");
            }
        } else {
            var explode = function () {
            $(".resultado3").css( "border", "0" );
            $(".resultado2").css( "border", "0" );
            };
            setTimeout(explode, 500);
        }
    });    
   
});

$(document).ready(function () {
 
    //ACTIVIDAD 1 REINO COLORES
    var colores = ["YELLOW", "BLUE", "GREEN", 'RED'];
    var random_colores = Math.floor(Math.random() * colores.length);

    $(".pres_color").text(colores[random_colores]);

    $(".c1").css("background-color", "red");
    $(".c2").css("background-color", "yellow");
    $(".c3").css("background-color", "green");
    $(".c4").css("background-color", "blue");

    $(".cl1").on("click", function () {
        if ($(".pres_color").text() == "RED") {
            $(".color1")[0].play();
            progreso = progreso + 25;
            if (progreso == 50) {
                $(".PNumerosA2").attr("class", "progress-bar progress-bar-success progress-bar-striped active PNumerosA2");
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Ja hem superat la meitat de l'activitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }

            if (progreso == 100 && $(".vh").length > 0 || progreso == 70 && $(".vh").length > 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if (progreso == 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            }
            $(".PNumerosA2").css("width", progreso + "%");
        } else {
            $(".vidas2 div:last-child").remove(); 4
            if ($(".vh").length == 1) {
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Encara ens queda una última oportunitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }

            if (progreso >= 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
                Acabadobien = false;
            }
        }
        colores = ["YELLOW", "BLUE", "GREEN", 'RED'];
        random_colores = Math.floor(Math.random() * colores.length);
        var explode = function () {
            $(".pres_color").text(colores[random_colores]);
        };
        setTimeout(explode, 250);
        
    });

    $(".cl2").on("click", function () {
        if ($(".pres_color").text() == "YELLOW") {
            $(".color2")[0].play();
            progreso = progreso + 25;
            if (progreso == 50) {
                $(".PNumerosA2").attr("class", "progress-bar progress-bar-success progress-bar-striped active PNumerosA2");
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Ja hem superat la meitat de l'activitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }

            if (progreso == 100 && $(".vh").length > 0 || progreso == 70 && $(".vh").length > 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if (progreso == 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            }
            $(".PNumerosA2").css("width", progreso + "%");
        } else {
            $(".vidas2 div:last-child").remove();
            if ($(".vh").length == 1) {
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Encara ens queda una última oportunitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
            if (progreso >= 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
                Acabadobien = false;
            }
        }
        colores = ["YELLOW", "BLUE", "GREEN", 'RED'];
        random_colores = Math.floor(Math.random() * colores.length);
        var explode = function () {
            $(".pres_color").text(colores[random_colores]);
        };
        setTimeout(explode, 250);
    });

    $(".cl3").on("click", function () {
        if ($(".pres_color").text() == "GREEN") {
            $(".color3")[0].play();
            progreso = progreso + 25;
            if (progreso == 50) {
                $(".PNumerosA2").attr("class", "progress-bar progress-bar-success progress-bar-striped active PNumerosA2");
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Ja hem superat la meitat de l'activitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }

            if (progreso == 100 && $(".vh").length > 0 || progreso == 70 && $(".vh").length > 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if (progreso == 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            }
            $(".PNumerosA2").css("width", progreso + "%");
        } else {
            $(".vidas2 div:last-child").remove();
            if ($(".vh").length == 1) {
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Encara ens queda una última oportunitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
            if (progreso >= 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
                Acabadobien = false;
            }
        }
        colores = ["YELLOW", "BLUE", "GREEN", 'RED'];
        random_colores = Math.floor(Math.random() * colores.length);
        var explode = function () {
            $(".pres_color").text(colores[random_colores]);
        };
        setTimeout(explode, 250);
    });

    $(".cl4").on("click", function () {
        if ($(".pres_color").text() == "BLUE") {
            $(".color4")[0].play();
            progreso = progreso + 25;
            if (progreso == 50) {
                $(".PNumerosA2").attr("class", "progress-bar progress-bar-success progress-bar-striped active PNumerosA2");
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Ja hem superat la meitat de l'activitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }

            if (progreso == 100 && $(".vh").length > 0 || progreso == 70 && $(".vh").length > 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            }

            $(".PNumerosA2").css("width", progreso + "%");
        } else {
            $(".vidas2 div:last-child").remove();
            if ($(".vh").length == 1) {
                $(".animacionheroe").html("<img class='animateheroe' src='https://media.giphy.com/media/2vjPAew1G8zaYWFdbS/giphy.gif'>");
                $(".textoheroe").css("background-size", "100% 100%");
                $(".textoheroe").html("<p>Encara ens queda una última oportunitat!</p>")
                var explode = function () {
                    $(".textoheroe").html("");
                    $(".animateheroe").remove();
                    $(".animacionheroe").html("<img class='animateheroe' src='https://preview.ibb.co/d7r1hd/heroe.png'>");
                    $(".textoheroe").css("background-size", "0 0");
                };
                setTimeout(explode, 5000);
            }
            if (progreso >= 50 && $(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/he3eqo/Bocadillo_Ganador.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
            } else if ($(".vh").length == 0) {
                $("#mostrarmodal").modal("show");
                $(".animacionmodal").empty();
                $(".animacionmodal").append('<img class="animacionmodal" src="https://preview.ibb.co/dheXRT/Bocadillo_Perdedor.png" alt="Bocadillo_Perdedor" />');
                $(".basea1").hide();
                Acabadobien = false;
            }
        }
        colores = ["YELLOW", "BLUE", "GREEN", 'RED'];
        random_colores = Math.floor(Math.random() * colores.length);
        var explode = function () {
            $(".pres_color").text(colores[random_colores]);
        };
        setTimeout(explode, 250);
    });


});

$(document).ready(function () {
    var nombreActividad = $(".nombre").text();
    var regneA;

    $(".botonacabar").on("click", function () {

        if ($(".nombre").text() == "Activitat1RN" || $(".nombre").text() == "Activitat2RN" || $(".nombre").text() == "Activitat3RN") {
            regneA = 1;
        } else {
            regneA = 2;
        }

        var Progreso = $(".progress-bar").width();

        if ($(".progress-bar").width() == 110) {
            Progreso = 20;
            Acabadobien = false;
        } else if ($(".progress-bar").width() == 220) {
            Progreso = 40;
            Acabadobien = false;
        } else if ($(".progress-bar").width() == 330) {
            Progreso = 60;
            Acabadobien = true;
        } else if ($(".progress-bar").width() == 440) {
            Progreso = 80;
            Acabadobien = true;
        } else if ($(".progress-bar").width() == 550) {
            Progreso = 90;
            Acabadobien = true;
        } else if ($(".progress-bar").width() == 660) {
            Progreso = 100;
            Acabadobien = true;
        }

        if ($(".nombre").text() == "Activitat3RN") {
            Progreso = progres_A3;
        }

        if ($(".nombre").text() == "Activitat1RC") {
            Progreso = progreso;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: base + "/api/GuardarInformacion",
            data: JSON.stringify({
                Nombre: nombreActividad,
                IdRegne: regneA,
                Fet_be: Acabadobien,
                Progres: Progreso
            }),
            dataType: 'json'
        });
    });

    $(".botonacabar").on("click", function () {
        // window.location.href = "Home/Index";
    });
});

$(document).ready(function () {
    var nombreActividad = $(".nombre").text();
    var regneA;

    $(".botonacabar3").on("click", function () {
        var Progreso;
        if ($(".nombre").text() == "Activitat1RN" || $(".nombre").text() == "Activitat2RN" || $(".nombre").text() == "Activitat3RN") {
            regneA = 1;
        } else {
            regneA = 2;
        }

        if ($(".nombre").text() == "Activitat3RN") {
            if ($(".vh").length == 0) {
                Progreso = 0;
                Acabadobien = false;
            }
            
            if ($(".vh").length == 2) {
                Progreso = 100;
                Acabadobien = true;
            }
        } else  if ($(".nombre").text() == "Activitat1RC") {
            Progreso = $(".PNumerosA2").width();
            if(Progreso < 50) {
                Acabadobien = false;   
            } else {
                Acabadobien = true;
            }
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: base + "/api/GuardarInformacion",
            data: JSON.stringify({
                Nombre: nombreActividad,
                IdRegne: regneA,
                Fet_be: Acabadobien,
                Progres: Progreso
            }),
            dataType: 'json'
        });
    });

    $(".botonacabar3").on("click", function () {
        window.location.href = "Index";
    });
});


    $(document).ready(function () {  
        $.ajax({  
            type: "GET",  
            url: base + "/api/GuardarInformacion",  
            contentType: "application/json; charset=utf-8",  
            dataType: "json",  
            success: function (data) {                 
                $.each(data, function (i, item) {  
                    var rows = item.nom;
                    $('.textores').text(rows);  
                }); 
                console.log(data);  
            },
            failure: function (data) {  
                console.log(data.responseText);  
            }, 
            error: function (data) {  
                console.log(data.responseText);  
            } 
        });         
    });  
 