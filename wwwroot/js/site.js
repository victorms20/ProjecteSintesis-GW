// ACTIVITAT 1 - REINO NUMEROS

var contador = 0;
var vidas_a1 = 4;
var addheart = 0;
$( document ).ready(function() {
    var app={
        cards: [1,1,2,2,3,3,4,4,5,5,6,6],
        init: function(){
          app.shuffle();
  
  
        },
        shuffle: function(){
          var random = 0;
          var temp = 0;
          for(i = 1; i< app.cards.length; i++){
            random = Math.round(Math.random() * i);
            temp = app.cards[i];
            app.cards[i]= app.cards[random];
            app.cards[random] = temp;
  
          }
          app.assignCards();
          console.log('Shuffled Card Array' +app.cards);
        },
        assignCards: function(){
          $('.card').each(function(index){
          $(this).attr("data-card-value",  app.cards[index]);
          });
          app.clickHandlers();
        },
        clickHandlers: function(){
          $('.card').on('click',function(){
          $(this).html('<p>' +$(this).data('cardValue')+'</p>').addClass('selected');
          app.checkMatch();
          });
        },
        checkMatch: function () {
          if($('.selected').length === 2){
            if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')){
              $('.selected').each(function(){
                $(this).animate({opacity:2 }).removeClass('unmatched');
                $(this).css("background","linear-gradient(to bottom right, #2A7F26, #0AFF00)");
              });
              $('.selected').each(function(){
                $(this).removeClass('selected');
              });
            app.checkWin()
            if(vidas_a1 > 4) {
                vidas_a1 = 4;
            } else {
                vidas_a1++;
                addheart++;
                if (addheart%2==0 && $(".vh").length <= 4) {
                    $(".vidas").append("<div class='vh'><img class='heart' src='https://vignette.wikia.nocookie.net/supermarioguias/images/7/74/8_bit_heart_stock_by_xquatrox-d4r844m.png/revision/latest?cb=20150901225402&path-prefix=es'></div>");
                }
            }
            contador = contador + 110;
            $('.PNumerosA').css("width",contador);
            if (contador == 330) {
                $(".PNumerosA").attr("class","progress-bar progress-bar-success progress-bar-striped active PNumerosA");
            } else if (contador == 660) {
                $(".PNumerosA").attr("class","progress-bar progress-bar-warning progress-bar-striped active PNumerosA");
            }
            }else{
              setTimeout(function(){
                $('.selected').each(function(){
                  $(this).html(' ').removeClass('selected');
                });
                $(".vidas div:last-child").remove();
                if (vidas_a1 != 0) {
                    vidas_a1--;
                }
                if($(".vh").length == 0) {
                    alert("JA! You so idiot mafrend!");
                }
              },500);
            }
          }
        },
        checkWin:function(){
        //   if($('.unmatched').length === 0){
        //     $('.game').html('<h1>You Won</h1>');
        //   }
        }
  
      };
      app.init();
});

//ACTIVIDAD 2 - REINO NUMEROS

$(document).ready(function () {
    for (var i = 0; i <= 4;i++) {
        $(".r" + i).attr("disabled", false);
    }

    var alargada = $('.resultado').length;
    var pantalla = $(".pres").text();
    var resultado;

    if (pantalla == "ONE") {
        resultado = 1;
    }

    $(".numeroclicat1").text(2 + Math.floor(Math.random() * 5));
    var n1 = $(".numeroclicat1").text();
    var n2 = n1;

    while (n1 == n2) {
        $(".numeroclicat2").text(2 + Math.floor(Math.random() * 5));
        n2 = $(".numeroclicat2").text();
    }
    var datos = [n1, n2];
    var n3 = n2;

    while ($.inArray(n3, datos) != -1) {
        $(".numeroclicat3").text(2 + Math.floor(Math.random() * 5));
        n3 = $(".numeroclicat3").text();
    }
    datos.push(n3);
    var n4 = n3;

    while ($.inArray(n4, datos) != -1) {
        $(".numeroclicat4").text(2 + Math.floor(Math.random() * 5));
        n4 = $(".numeroclicat4").text();
    }

    var random_numero1 = Math.floor(Math.random() * 4) + 1;
    $(".numeroclicat" + random_numero1).text("1");

    $(".r1").click(function () {
        if ($(this).text() == resultado) {
            $(".numeroclicat1").css("color", "green");
        } else {
            $(".vidas div:last-child").remove();
            $(this).attr("disabled", true);
        }
    });

    $(".r2").click(function () {
        if ($(this).text() == resultado) {
            $(".numeroclicat2").css("color", "green");
        } else {
            $(".vidas div:last-child").remove();
            $(this).attr("disabled", true);
        }
    });

    $(".r3").click(function () {
        if ($(this).text() == resultado) {
            $(".numeroclicat3").css("color", "green");
        } else {
            $(".vidas div:last-child").remove();
            $(this).attr("disabled", true);
        }
    });

    $(".r4").click(function () {
        if ($(this).text() == resultado) {
            $(".numeroclicat4").css("color", "green");
        } else {
            $(".vidas div:last-child").remove();
            $(this).attr("disabled", true);
        }
    });
    
    
});