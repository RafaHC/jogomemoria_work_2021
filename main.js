let jogadores = [
    { numero: 1, nome: '', jogar: true, acertos: 0, erros: 0 },
    { numero: 2, nome: '', jogar: false, acertos: 0, erros: 0 }
];





const cardBoard = document.querySelector("#cardboard");

const imgs = montarJogo();

cardBoard.innerHTML = desenharJogo(imgs);

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
    if (lockCards) return false;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return false;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards() {
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        contabilizarErros();
        console.log(jogadores);

        resetCards();
    }, 1000);
}

function resetCards(isMatch = false) {
    if (isMatch) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        contabilizarAcertos();
        console.log(jogadores);

    }

    [firstCard, secondCard, lockCards] = [null, null, false];
}

function contabilizarAcertos() {
    jogadores.forEach(jogador => {
        if (jogador.jogar) jogador.acertos += 1;
    });

    document.getElementById('resultado').innerHTML = `<br><h2>Resultado do Jogo: ${jogadores[0].nome} - ${jogadores[0].acertos} X ${jogadores[1].nome} - ${jogadores[1].acertos}  </h2>`;
}

function contabilizarErros() {
    jogadores.forEach(jogador => {
        if (jogador.jogar) jogador.erros += 1;
        jogador.jogar = !jogador.jogar;

    })
}


function embaralhar(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function definirNomeJogadores() {
    jogadores.forEach((jog) => {
        jog.nome = prompt(`Digite o nome do jogador ${jog.numero}`);
    });
}

function montarJogo() {

    definirNomeJogadores();
    console.log(jogadores);
    let imgs = [
        'foto1.jpeg',
        'foto2.jpeg',
        'foto3.jpeg',
        'foto4.jpeg',
        'foto5.jpeg',
        'foto6.jpeg'
    ];

    /*  "vue.svg",
      "angular.svg",
      "react.svg",
      "ember.svg",
      "backbone.svg",
      "aurelia.svg"*/

    imgs = embaralhar(imgs);
    return imgs;
}


function desenharJogo(imgs) {
    let cardHTML = "";

    imgs.forEach(img => {
        cardHTML += `<div class="memory-card" data-card="${img}">
      <img class="front-face" src="img/${img}"/>
      <img class="back-face" src="img/cosmeticos.jpg">
    </div>`;
    });
    return cardHTML + cardHTML + `<div id='resultado'></div>`;
}