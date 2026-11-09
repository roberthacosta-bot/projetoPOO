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
let imgPocao;
let pontos = 0;
let mapeamento;
let cenarioX = 0;
let velocidade = 5;
let alturaCenario, larguraCenario = 2146;
let centroTela = 400;
let animacoes;
let somPulo, somGameOver;
let gameOverTocado = false;
let imgPorta, porta;
let portaX, portaY;
let faseAtual = 1;
let fase1;
let estaFase;

async function setup() {
  createCanvas(800, 600);

  font = await loadFont("assets/Silkscreen-Regular.ttf");

  img = await loadImage("assets/flora.png");
  imgPocao = await loadImage("assets/pocao.png");
  imgPorta = await loadImage("assets/porta.png");
  somPulo = await loadSound("assets/pulo.mp3")
  somGameOver = await loadSound("assets/gameover.mp3")

  fase1 = await loadJSON("fases/fase1.json");


  imgCenario = {
    fase1: await loadImage("assets/fase1.png"),
    fase2: await loadImage("assets/fase2.png"),
    fase3: await loadImage("assets/fase3.png"),
    fase4: await loadImage("assets/fase4.png"),
    fase5: await loadImage("assets/fase5.png"),
  };

  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
    Terra: await loadImage("assets/plataformaTerra.png"),
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

  estaFase = montarFase(imgCenario.fase1, fase1);

}
function montarFase(cenario, jsonFase) {
  let objFase1 = new Fase(cenario)

  for (let p of jsonFase.plataformas) {
    objFase1.plataformas.push(
      new Plataforma(p.x, p.y, p.largura, p.altura, p.n, imgPlataformas[p.tipo]),
    );
  }

  for (let i of jsonFase.itens) {
    objFase1.itens.push(
      new Item(i.x, i.y, i.largura, i.altura, imgPocao),
    );
  }

  return objFase1
}

function draw() {
  if (executando) {
    desenharJogo();

  } else {
    desenharGameOver();
  }
}

function desenharGameOver() {
  image(imgCenario["fase" + faseAtual],0, 0, width, height);
  imgCenario["fase" + faseAtual].filter(GRAY);
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

  image(imgPocao, 50, 50);

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

      for (let p of estaFase.plataformas) {
        p.moverDireita();
      }

      for (let item of estaFase.itens) {
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

      for (let p of estaFase.plataformas) {
        p.moverEsquerda();
      }

      for (let item of estaFase.itens) {
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

  if(!gameOverTocado){
    somGameOver.play();
    gameOverTocado = true;
  }
}

  for (let i = 0; i < estaFase.itens.length; i++) {
    if (personagem.checarColisao(estaFase.itens[i])) {
      estaFase.itens.splice(i, 1);
      pontos++;
      i--;
    }
  }

  for (let plataforma of estaFase.plataformas) {
    if (personagem.checarColisao(plataforma) === 1) {
      personagem.pisarNoChao(plataforma);
    } else if (personagem.checarColisao(plataforma) === 2) {
      personagem.baterCabeca(plataforma);
    }
  }

  for (let p of estaFase.plataformas) {
    p.desenhar();
  }

  for (let item of estaFase.itens) {
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
