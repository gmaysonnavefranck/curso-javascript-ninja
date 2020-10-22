(function(doc){
    'use strict';
    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:

    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;
    
    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */
    

    var $screen = doc.querySelector('[data-js="screen"]');
    var $button = doc.querySelectorAll('[data-js="button"]');
  
    Array.prototype.forEach.call($button, function(button){
        button.addEventListener('click',buttonPress.call(this) ,false); 
    }, false);

    function findOperator(operator){
        return $screen.value.search(operator);
    }

    function operator(value){
        if(!isNumber($screen.value.charAt($screen.value.length-1)))
            $screen.value = $screen.value.slice(0, -1) + value; 
        else
            $screen.value += value;   
    }

    function number(value){
        if($screen.value === '0')
            $screen.value = value;
        else
            $screen.value += value;
    }

    function isNumber(value){
        switch(value){
            case '+':
                return 0;    
            case '-':
                return 0;
            case 'x':
                return 0;
            case '÷':
                return 0;
            default:
                return 1;
        }
    }

    function findNumber(expression,position,opLocation){

        var auxOpLocation = opLocation;
        while(isNumber(expression.charAt(auxOpLocation+position)) 
            && ((auxOpLocation > 0) && (auxOpLocation < (expression.length-1)))){
                    auxOpLocation += position;
        }
        if(position > 0){
            var startNumPos = (opLocation + 1);
            var lastNumPos = auxOpLocation;
        }
        else{
            var startNumPos = auxOpLocation;
            var lastNumPos = (opLocation - 1);  
        }
        return expression.slice(startNumPos, lastNumPos+1)
    }

    function calculate(operator){
        while(findOperator(operator) > 0){
            var result = 0;
            var expression = $screen.value;
            var opLocation = findOperator(operator);
            var aNumber = findNumber(expression, (-1), opLocation);
            var bNumber = findNumber(expression, 1, opLocation);
            var opSymbol = expression.charAt(opLocation);
            if(opSymbol === 'x')
                result = +aNumber*(+bNumber);
            if(opSymbol === '÷')
                result = +aNumber/(+bNumber);
            if(opSymbol === '-')
                result = +aNumber-(+bNumber);
            if(opSymbol === '+')
                result = +aNumber + (+bNumber);
            $screen.value = expression.replace((aNumber+opSymbol+bNumber), String(result));
        }
    }

    function buttonPress(){
        return function(){
            switch(this.value){
                case '=':
                    if(!isNumber($screen.value.charAt($screen.value.length)))
                        $screen.value = $screen.value.slice(0,-1)
                    calculate(/[\÷\x]/);
                    calculate(/[\+\-]/);
                break;
                case 'CE':
                    $screen.value = 0;
                break;
                case '+':
                    operator(this.value);  
                break;
                case '-':
                    operator(this.value);
                break;
                case 'x':
                    operator(this.value);
                break;
                case '÷':
                    operator(this.value);
                break;
                default:
                    number(this.value);
                break;
            }
        }
    }
})(document)
