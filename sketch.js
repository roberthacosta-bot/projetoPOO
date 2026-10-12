
let img;
let imgCenario;
let x, y;
let vx, vy;
let g;
let largura;
let personagem;
let plataformas = [];
let imgPlataformas;
let imgPersonagem;
let font;
let executando = true;
let itens = [];
let imgCoracao;
let pontos = 0;
let mapeamento;
let cenarioX = 0;
let velocidade = 5;
let alturaCenario;
let larguraCenario = 2146;
let centroTela = 400;
let animacoes;

async function setup() {
  createCanvas(800, 600);

  font = await loadFont("assets/Silkscreen-Regular.ttf");
  img = await loadImage("assets/flora.png");
  imgCoracao = await loadImage("assets/coracao.png");
  imgCenario = await loadImage("assets/cenario2.png");

  alturaCenario = height;
  larguraCenario =
  imgCenario.width * (alturaCenario / imgCenario.height);

  x = width / 2;
  y = 10;
  vx = 0;
  vy = 0;
  g = 0.8;
  largura = 100;

 
mapeamento = {

run: {
  escala: 1.45,
  frames: [
    { x: 0, y: 0 },
    { x: 109, y: 0 },
    { x: 218, y: 0 },
    { x: 326, y: 0 },
    { x: 435, y: 0 },
    { x: 544, y: 0 },
    { x: 652, y: 0 },
    { x: 761, y: 0 },
  ],
  frameWidth: 109,
  frameHeight: 122,
},

  jump: {
    escala: 1.8,
    frames: [
      { x: 0, y: 0 },
      { x: 97.75, y: 0 },
      { x: 195.5, y: 0 },
      { x: 293.25, y: 0 },
      { x: 391, y: 0 },
      { x: 488.75, y: 0 },
      { x: 586.5, y: 0 },
      { x: 684.25, y: 0 },
      { x: 782, y: 0 },
      { x: 879.75, y: 0 },
      { x: 977.5, y: 0 },
      { x: 1075.25, y: 0 },
    ],
    frameWidth: 97.75,
    frameHeight: 173,
  },

  idle: {
    escala: 1,
    frames: [
      { x: 0, y: 0 },
      { x: 200.2, y: 0 },
      { x: 400.4, y: 0 },
      { x: 600.6, y: 0 },
      { x: 800.8, y: 0 },
    ],
    frameWidth: 200.2,
    frameHeight: 249,
  },
};

  imgPersonagem = {
    run: await loadImage("assets/run.png"),
    jump: await loadImage("assets/jump.png"),
    idle: await loadImage("assets/idle.png"),
  };

  animacoes = {
    run: new Animacao(mapeamento.run, imgPersonagem.run),
    jump: new Animacao(mapeamento.jump, imgPersonagem.jump),
    idle: new Animacao(mapeamento.idle, imgPersonagem.idle),
  };

  personagem = new Personagem(
    x,
    y,
    46 * 2,
    68 * 2,
    animacoes
  );

  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
  };

  plataformas.push(
    new Plataforma(
      0,
      height - 40,
      40,
      40,
      54,
      imgPlataformas.terra
    )
  );

  itens.push(
    new Item(width + 45, height - 250, 40, 40, imgCoracao)
  );
  itens.push(
    new Item(100, height - 140, 40, 40, imgCoracao)
  );
  itens.push(
    new Item(150, height - 140, 40, 40, imgCoracao)
  );
  itens.push(
    new Item(200, height - 140, 40, 40, imgCoracao)
  );
} // Fecha a função setup corretamente.

function draw() {
  if (executando === true) {
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

  if (keyIsDown(LEFT_ARROW)) {
    personagem.olharParaEsquerda();
    personagem.correr();

    if (personagem.x > 0 && personagem.x <= centroTela) {
      personagem.x -= velocidade;
    } else if (cenarioX < 0 && personagem.x <= centroTela) {
      cenarioX += velocidade;

      if (cenarioX > 0) {
        cenarioX = 0;
      }

      for (let p of plataformas) {
        p.moverDireita();
      }

      for (let item of itens) {
        item.moverDireita();
      }
    } else if (personagem.x > 0) {
      personagem.x -= velocidade;
    }

  } else if (keyIsDown(RIGHT_ARROW)) {
    personagem.olharParaDireita();
    personagem.correr();

    if (personagem.x < centroTela && cenarioX === 0) {
      personagem.x += velocidade;
    } else if (cenarioX > width - larguraCenario) {
      cenarioX -= velocidade;

      if (cenarioX < width - larguraCenario) {
        cenarioX = width - larguraCenario;
      }

      for (let p of plataformas) {
        p.moverEsquerda();
      }

      for (let item of itens) {
        item.moverEsquerda();
      }
    } else {
      personagem.x += velocidade;
    }

  } else {
    personagem.parar();
  }

  if (cenarioX > 0) {
    cenarioX = 0;
  }

  if (cenarioX < width - larguraCenario) {
    cenarioX = width - larguraCenario;
  }

  image(imgCenario, cenarioX, 0, larguraCenario, height);

  desenharPontuacao();
  personagem.aplicarGravidade();

  if (personagem.y > height) {
    executando = false;
  }

  for (let i = 0; i < itens.length; i++) {
    if (personagem.checarColisao(itens[i])) {
      itens.splice(i, 1);
      pontos++;
      i--;
    }
  }

  for (let plataforma of plataformas) {
    if (personagem.checarColisao(plataforma) === 1) {
      personagem.pisarNoChao(plataforma);
    } else if (personagem.checarColisao(plataforma) === 2) {
      personagem.baterCabeca(plataforma);
    }
  }

  personagem.desenhar();

  for (let p of plataformas) {
    p.desenhar();
  }

  for (let item of itens) {
    item.desenhar();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || key === " ") {
    personagem.pular();
  }
}

