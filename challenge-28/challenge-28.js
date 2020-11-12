(function(doc){
  'use strict';
   /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."
  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
  function isRequestOk(){
    return ajax.readyState === 4 && ajax.status === 200;
  };

  function getCep(event){
    event.preventDefault()
    ajaxInit(cleanCEP($input.value))
  };

  function cleanCEP(CEP){
    var regex = /\D+/g
    return CEP.replace(regex, '');
  };

  function fillFields(adressInfo){
    console.log(adressInfo)
    $CEP.value = adressInfo.cep;
    $Logradouro.value = adressInfo.logradouro;
    $Cidade.value = adressInfo.localidade;
    $Bairro.value = adressInfo.bairro;
    $Estado.value = adressInfo.uf;
  }

  function ajaxInit(CEP){
    var link = 'https://viacep.com.br/ws/' + CEP + '/json/';
    ajax.open('GET', link);
    $menssagem.value = 'Buscando informações para o CEP '+CEP+'...';
    ajax.send();
  }

  var $button = doc.querySelector("#button");
  var $input = doc.querySelector("#CEPinput");
  var $CEP = doc.querySelector("#CEP");
  var $Logradouro = doc.querySelector("#Logradouro");
  var $Cidade = doc.querySelector("#Cidade");
  var $Bairro = doc.querySelector("#Bairro");
  var $Estado = doc.querySelector("#Estado");
  var $menssagem = doc.querySelector("#Menssagem")
  var ajax = new XMLHttpRequest();
  
  $button.addEventListener("click", getCep,false);
  ajax.addEventListener('readystatechange', function(){
    if(isRequestOk()){
      $menssagem.value = 'Endereço referente ao CEP ' + (cleanCEP($input.value));
      fillFields(JSON.parse(ajax.responseText));
    }
    else {
      $menssagem.value = 'Não encontramos o endereço para o CEP ' + (cleanCEP($input.value));
    }
  }, false);

})(document)
