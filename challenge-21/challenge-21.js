(function(doc){
    'use strict';
    var $Start = doc.querySelector(['input[data-js="Start"]']);
    var $Stop = doc.querySelector(['input[data-js="Stop"]']);
    var $Reset = doc.querySelector(['input[data-js="Reset"]']);
    var $Screen = doc.querySelector(['input[data-js="Screen"]']);
    var temporizador;

    $Start.addEventListener('click', startTimer, false);
    $Stop.addEventListener('click', stopTimer, false)
    $Reset.addEventListener('click', resetTimer, false)

    function startTimer(){
        $Screen.value = String(parseInt($Screen.value) + 1);
        temporizador = setTimeout(startTimer, 1000);
    }

    function stopTimer(){
        clearTimeout(temporizador);
    }

    function resetTimer(){
        stopTimer();
        $Screen.value = 0;
    }
})(document)
