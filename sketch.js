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
let alturaCenario, larguraCenario = 2146;
let centroTela = 400;
let animacoes;
let imgPorta, porta;
let portaX, portaY;
let faseAtual = 1;

async function setup() {
  createCanvas(800, 600);

  font = await loadFont("assets/Silkscreen-Regular.ttf");

  img = await loadImage("assets/flora.png");
  imgCoracao = await loadImage("assets/coracao.png");
  imgPorta = await loadImage("assets/porta.png");

  imgCenario = {
    fase1: await loadImage("assets/fase1.png"),
    fase2: await loadImage("assets/fase2.png"),
    fase3: await loadImage("assets/fase3.png"),
    fase4: await loadImage("assets/fase4.png"),
    fase5: await loadImage("assets/fase5.png"),
  };

  alturaCenario = height;

  larguraCenario =
    imgCenario.fase1.width *
    (alturaCenario / imgCenario.fase1.height);

  x = 620;
  y = height - 40 - (68 * 2);

  vx = 0;
  vy = 0;
  g = 0.8;
  largura = 100;

  mapeamento = {
    idle: {
      frames: [
        { x: 0, y: 22 },
        { x: 216, y: 10 },
        { x: 436, y: 16 },
        { x: 655, y: 27 },
        { x: 871, y: 28 },
        { x: 1098, y: 30 },
        { x: 1321, y: 35 },
      ],
      frameWidth: 216,
      frameHeight: 214,
    },

    jump: {
      frames: [
        { x: 0, y: 57 },
        { x: 259, y: 38 },
        { x: 516, y: 6 },
        { x: 762, y: 2 },
        { x: 1009, y: 26 },
        { x: 1261, y: 66 },
        { x: 1506, y: 67 },
      ],
      frameWidth: 211,
      frameHeight: 198,
    },

    run: {
      frames: [
        { x: 16, y: 43 },
        { x: 264, y: 43 },
        { x: 517, y: 43 },
        { x: 764, y: 43 },
        { x: 1010, y: 43 },
        { x: 1262, y: 43 },
        { x: 1513, y: 43 },
      ],
      frameWidth: 199,
      frameHeight: 200,
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

  porta = new Porta(1600, 315, 154, 248, imgPorta);

  personagem = new Personagem(0, y, 46 * 2, 68 * 2, animacoes);

  

  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
    Terra: await loadImage("assets/plataformaTerra.png"),
  };

  plataformas.push(new Plataforma(0, height - 70, 130, 150, 1, imgPlataformas.Terra));
  plataformas.push(new Plataforma(570, height - 348, 130, 130, 1, imgPlataformas.Terra ));
  plataformas.push(new Plataforma(670, height - 448, 130, 130, 1, imgPlataformas.Terra ));
  plataformas.push(new Plataforma(1000, height - 280, 130, 130, 1, imgPlataformas.Terra ));
  plataformas.push(new Plataforma(370, height - 248, 130, 130, 1, imgPlataformas.Terra ));
  plataformas.push(new Plataforma(1600, 565, 130, 130, 1, imgPlataformas.Terra ));
  plataformas.push(new Plataforma(1300, height - 148, 130, 130, 1, imgPlataformas.Terra ));

  itens.push(
    new Item(725, height - 488, 40, 40, imgCoracao)
  );

  itens.push(
    new Item(1025, height - 316, 40, 40, imgCoracao)
  );

  itens.push(
    new Item(200, height - 140, 40, 40, imgCoracao)
  );
}

function draw() {
  if (executando) {
    desenharJogo();

  } else {
    desenharGameOver();
  }
}

function desenharGameOver() {
  image(
    imgCenario["fase" + faseAtual],
    0, 0, width, height
  );

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

      if (cenarioX > 0) cenarioX = 0;

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

  if (cenarioX > 0) cenarioX = 0;

  if (cenarioX < width - larguraCenario) {
    cenarioX = width - larguraCenario;
  }

  image(
    imgCenario["fase" + faseAtual],
    cenarioX, 0, larguraCenario, height
  );

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

  for (let p of plataformas) {
    p.desenhar();
  }

  for (let item of itens) {
    item.desenhar();
  }

   porta.desenhar();
  personagem.desenhar();
  desenharPontuacao();
}

function keyPressed() {
  if (keyCode === UP_ARROW || key === " ") {
    personagem.pular();
  }
}
