let img;
let imgCenario;
let x, y;
let vx, vy;
let g;
let largura;
let personagem;
let plataformas = [];
let imgPlataformas;
let font;
let executando = true;
let itens = [];
let imgCoracao;
let pontos = 0;

async function setup() {
  createCanvas(3000, 700);

  font = await loadFont(
    "assets/Honk-Regular-VariableFont_MORF,SHLN.ttf"
  );

  img = await loadImage("assets/flora.png");
  imgCoracao = await loadImage("assets/coracao.png");
  imgCenario = await loadImage("assets/cenario2.png");

  imgCenario.resize(3000, 700);

  // Posição inicial do personagem
  x = 1400;
  y = 400;

  vx = 0;
  vy = 0;
  g = 0.8;
  largura = 100;

  personagem = new Personagem(x, y, largura, 0, img);

  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
  };

  // PLATAFORMA INICIAL
  plataformas.push(new Plataforma(1100, height - 70, 800, 40, 15, imgPlataformas.terra));
  // OUTRAS PLATAFORMAS
  plataformas.push(new Plataforma(500, height - 210, 300, 40, 5, imgPlataformas.pedra));
  plataformas.push(new Plataforma(850, height - 340, 300, 40, 5, imgPlataformas.pedra));
  plataformas.push(new Plataforma(1950, height - 210, 300, 40, 5, imgPlataformas.pedra));
  plataformas.push(new Plataforma(2350, height - 70, 500, 40, 5, imgPlataformas.terra));

  // ITENS
  itens.push(new Item(1200, height - 140, 40, 40, imgCoracao));
  itens.push(new Item(1300, height - 140, 40, 40, imgCoracao));
  itens.push(new Item(1400, height - 140, 40, 40, imgCoracao));
  itens.push(new Item(1500,height - 140, 40, 40, imgCoracao));
}

function draw() {
  if (executando == true) {
    desenharJogo();
  } else {
    desenharGameOver();
  }
}

// GAME OVER
function desenharGameOver() {
  imgCenario.filter(GRAY);
  image(imgCenario, 0, 0);
  fill("red");
  textSize(90);
  textFont(font);
  textAlign(CENTER, CENTER);

  text(
    "Game Over",
    width / 2,
    height / 2
  );
}

// PONTUAÇÃO
function desenharPontuacao() {
  fill("#ffffff83");
  noStroke();

  rect(
    40,
    40,
    150,
    60
  );

  image(
    imgCoracao,
    50,
    50,
    35,
    35
  );

  fill("black");
  textSize(30);
  text(
    "x " + pontos,
    95,
    80
  );
}

// JOGO
function desenharJogo() {
  background(220);
  image(
    imgCenario,
    0,
    0
  );

  desenharPontuacao();

  // MOVIMENTO PARA A ESQUERDA
  if (keyIsDown(LEFT_ARROW)) {
    personagem.olharParaEsquerda();
    for (let i = 0; i < plataformas.length; i++) {
      plataformas[i].moverDireita();
    }
    for (let i = 0; i < itens.length; i++) {
      itens[i].moverDireita();
    }
  }

  // MOVIMENTO PARA A DIREITA
  else if (keyIsDown(RIGHT_ARROW)) {

    personagem.olharParaDireita();

    for (let i = 0; i < plataformas.length; i++) {
      plataformas[i].moverEsquerda();
    }

    for (let i = 0; i < itens.length; i++) {
      itens[i].moverEsquerda();
    }
  }


  else {
    personagem.parar();
  }

  // GRAVIDADE
  personagem.aplicarGravidade();

  // COLISÃO COM PLATAFORMAS
  for (let plataforma of plataformas) {

    let colisao = personagem.checarColisao(plataforma);

    // Caiu em cima
    if (colisao == 1) {

      personagem.pisarNoChao(plataforma);

    }

    // Bateu por baixo
    else if (colisao == 2) {

      personagem.baterCabeca(plataforma);

      plataforma.setCor("#FF0000");
    }
  }

  // PEGAR ITENS
  for (let i = itens.length - 1; i >= 0; i--) {

    if (personagem.checarColisao(itens[i])) {

      itens.splice(i, 1);

      pontos++;
    }
  }

  // MORTE AO CAIR
  if (personagem.y > height + 100) {
    executando = false;
  }

  // DESENHAR PERSONAGEM
  personagem.desenhar();

  // DESENHAR PLATAFORMAS
  for (let plataforma of plataformas) {

    plataforma.desenhar();
  }

  // DESENHAR ITENS
  for (let item of itens) {

    item.desenhar();
  }
}

// PULO
function keyPressed() {

  if (keyCode == UP_ARROW) {

    personagem.pular();
  }
}