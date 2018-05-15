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