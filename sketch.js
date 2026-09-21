// http://10.12.130.73:5501/plataforma-aula/assets/

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
  createCanvas(800, 600);

  font = await loadFont("assets/Honk-Regular-VariableFont_MORF,SHLN.ttf");
  img = await loadImage("assets/flora.png");
  imgCoracao = await loadImage("assets/coracao.png");
  imgCenario = await loadImage("assets/cenario2.png");
  imgCenario.resize(800, 600);
  x = width / 2;
  y = 10;
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

  plataformas.push(
    new Plataforma(0, height - 70, 40, 40, 15, imgPlataformas.terra),
  );
  plataformas.push(
    new Plataforma(500, height - 210, 40, 40, 5, imgPlataformas.pedra),
  );
  plataformas.push(
    new Plataforma(360, height - 340, 40, 40, 5, imgPlataformas.pedra),
  );
  plataformas.push(
    new Plataforma(width + 130, height - 70, 40, 40, 5, imgPlataformas.terra),
  );

  itens.push(new Item(width + 45, height - 250, 40, 40, imgCoracao));
  itens.push(new Item(100, height - 140, 40, 40, imgCoracao));
  itens.push(new Item(150, height - 140, 40, 40, imgCoracao));
  itens.push(new Item(200, height - 140, 40, 40, imgCoracao));
}

function draw() {
  if (executando == true) {
    desenharJogo();
  } else {
    desenharGameOver();
  }
}

function desenharGameOver() {
  imgCenario.filter(GRAY);
  image(imgCenario, 0, 0);
  fill("red");
  textSize(90);
  textFont(font);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

function desenharPontuacao() {
  fill("#ffffff83");
  noStroke();
  rect(40, 40, 150, 60);
  image(imgCoracao, 50, 50);
  fill("black");
  textSize(30);
  text("x " + pontos, 95, 80);
}

function desenharJogo() {
  background(220);
  image(imgCenario, 0, 0);
  desenharPontuacao();

  if (keyIsDown(LEFT_ARROW)) {
    personagem.olharParaEsquerda();
    // Move todas as plataformas para a direita
    for (let i = 0; i < plataformas.length; i++) {
      plataformas[i].moverDireita();
    }

    // Move todos os itens para a direita
    for (let i = 0; i < itens.length; i++) {
      itens[i].moverDireita();
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    personagem.olharParaDireita();
    // Move todas as plataformas para a esquerda
    for (let i = 0; i < plataformas.length; i++) {
      plataformas[i].moverEsquerda();
    }

    // Move todos os itens para a esquerda
    for (let i = 0; i < itens.length; i++) {
      itens[i].moverEsquerda();
    }
  } else {
    personagem.parar();
  }

  // todas as atualizações
  personagem.aplicarGravidade();

  if (personagem.y > height) {
    executando = false;
  }

  for (let i = 0; i < itens.length; i++) {
    if (personagem.checarColisao(itens[i])) {
      itens.splice(i, 1);
      pontos++;
    }
  }

  for (let plataforma of plataformas) {
    if (personagem.checarColisao(plataforma) == 1) {
      personagem.pisarNoChao(plataforma);
    } else if (personagem.checarColisao(plataforma) == 2) {
      personagem.baterCabeca(plataforma);
      plataforma.setCor("#FF0000");
    }
  }

  // todos os dsenhos
  personagem.desenhar();

  // Desenha todas as plataformas
  for (let plataforma of plataformas) {
    plataforma.desenhar();
  }

  // Desenha todos os itens
  for (let item of itens) {
    item.desenhar();
  }
}

function keyPressed() {
  if (keyCode == 38) {
    personagem.pular();
  }
}
