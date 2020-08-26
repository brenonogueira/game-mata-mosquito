
//definindo tamanho ajustável da tela de jogo
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

//nivel de jogo
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	//1500
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000
} else if (nivel === 'hardcore') {
	//750
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

//cronometro do jogo 
var cronometro = setInterval(function() {
	tempo -= 1
	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {	
	document.getElementById('cronometro').innerHTML = tempo //Inserir texto dentro do html pelo JS
	}
}, 1000)



//criaçao de posiçao randomica integrando com a resolução
function posicaoRandomica() {

	//remover o mosquito anterior caso exista
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		if(vidas > 3) {
			//redirecionar para pagina de game over
			window.location.href = 'fim_de_jogo.html'
		} else {
		//tirar uma vida caso o usuario nao clique no mosquito
		document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

		vidas++
		}
	}
	

	var posicaoX = Math.floor(Math.random() * largura) - 90 //diminuir por 90 para nao estourar
	var posicaoY = Math.floor(Math.random() * altura) - 90 //diminuir por 90 para nao estourar

	//nao teremos posições negativas, respeitando os limites
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY  //? se for : se nao for

	console.log(posicaoX, posicaoY)

	//criar elemento html 
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //recebe a funçao de tamanhos aleatorios + troca o lado
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function(){
		this.remove()
	}

	//acessar o body e incluir a img dentro do body
	document.body.appendChild(mosquito)

	console.log(ladoAleatorio())

} 

//tamanho aleatorio mosquito
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)

	//trocar classes baseadas no random gerado
	switch(classe) {
		case 0: 
			return 'mosquito1'
		case 1: 
			return 'mosquito2'
		case 2: 
			return 'mosquito3'
	}
}

//lado do mosquito aleatorio
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	//trocar classes baseadas no random gerado
	switch(classe) {
		case 0: 
			return 'ladoA'
		case 1: 
			return 'ladoB'
	}
}

