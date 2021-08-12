// This is a JavaScript file


function verConexao() {
    var networkState = navigator.connection.type;

    if (states[Connection.NONE]){
      function sair(buttonIndex){
        navigator.app.exitApp();
      }
      navigator.notification.confirm("Erro de Conexão",sair,"Você está sem conexão, deixe mais tarde.",['Sair','Ficar'])
    }
}

window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");
  const id = document.querySelector("#id");

  cadastrar.addEventListener("click", function (){
    verConexao();
    let formdata = new Formdata();
    formdata.append('nome', `${nome.value}`);
    formdata.append('curso', `${curso.value}`);

    fetch ("http://www.ligiamizuyama.com.br/exemplo_api/pessoa", {
      body: formdata,
      method: "post",
      mode: 'cors',
      cache: 'default',
    }).then(() => {
       alert("Registro efetuado com sucesso");
       limparCampos();
    }
  );
})

buscar.addEventListener("click", function(){
  verConexao();
  fetch (`http://www.ligiamizuyama.com.br/exemplo_api/pessoa/${id.value}`, {
    method: "get",
    mode: 'cors',
    cache: 'default',
  }).then(response=> {
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
    })
  })
})

alterar.addEventListener("click", function(){
  verConexao();
  fetch (`http://www.ligiamizuyama.com.br/exemplo_api/pessoa/${id.value}`, {
    method:"put",
    mode:'cors',
    cache:'default',
    headers:{
    'Content-type':'application/json; charset=UTF-8'
  },
    body:JSON.stringify({
    'nome':`${nome.value}`,
    'curso':`${curso.value}`,
    })
  }).then(() => {
    alert("Registro Alterado com Sucesso");
    limparCampos();
  });
})

deletar.addEventListener("click", function(){
  verConexao();
  fetch (`http://www.ligiamizuyama.com.br/exemplo_api/pessoa/${id.value}`, {
    method:"get",
    mode:'cors',
    cache:'default'
  }).then(() => {
    alert("Registro Alterado com Sucesso");
    limparCampos();
  });
})

function limparCampos(){
    nome.value="";
    curso.value="";
  }
}

$(document).on("click", "#codigo", function(){
  verConexao();
  cordova.plugins.barcodeScanner.scan( function (result) {
    alert("Código de barras \n" +
        "Resultado: " + result.text + "\n" +
        "Formato: " + result.format + "\n" +
        "Cancelado: " + result.cancelled);
  },
  function (error) {
    alert("Erro: " + error);
  },
  {
    preferFrontCamera : false, 
    showFlipCameraButton : true, 
    showTorchButton : true,
    torchOn: true,
    saveHistory: true, 
    prompt : "Coloque o código de barras na tela", 
    resultDisplayDuration: 500, 
    formats : "QR_CODE,PDF_417", 
    orientation : "landscape",
    disableAnimations : true, 
    disableSuccessBeep: false 
  }
)
});

$(document).on("click", "#buscar", function(){
  verConexao();
});

