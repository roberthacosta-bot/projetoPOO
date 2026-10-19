
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

  // Mapeamento do personagem
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
        { x: 0, y: 62 },
        { x: 222, y: 33 },
        { x: 451, y: 0 },
        { x: 672, y: 0 },
        { x: 885, y: 33 },
        { x: 1105, y: 56 },
        { x: 1329, y: 61 },
      ],
      frameWidth: 192,
      frameHeight: 183,
    },

    run: {
      frames: [
        { x: 0, y: 29 },
        { x: 216, y: 25 },
        { x: 440, y: 26 },
        { x: 661, y: 26 },
        { x: 878, y: 27 },
        { x: 1095, y: 26 },
        { x: 1308, y: 25 },
      ],
      frameWidth: 192,
      frameHeight: 186,
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
    x, y, 46 * 2, 68 * 2, animacoes
  );

  // Mapeamento da nova porta: 6 quadros horizontais
  const quantidadeFramesPorta = 6;
  const larguraQuadroPorta =
    imgPorta.width / quantidadeFramesPorta;

  const mapeamentoPorta = {
    escala: 1.45,

    frames: Array.from(
      { length: quantidadeFramesPorta },
      (_, i) => ({
        x: i * larguraQuadroPorta,
        y: 0,
      })
    ),

    frameWidth: larguraQuadroPorta,
    frameHeight: imgPorta.height,
  };

  const larguraPorta =
    mapeamentoPorta.frameWidth * mapeamentoPorta.escala;

  const alturaPorta =
    mapeamentoPorta.frameHeight * mapeamentoPorta.escala;

  portaX = larguraCenario - larguraPorta - 20;
  portaY = height - 40 - alturaPorta;

  porta = new Porta(
    portaX,
    portaY,
    larguraPorta,
    alturaPorta,
    imgPorta,
    mapeamentoPorta
  );

  // Imagens das plataformas
  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
  };

  plataformas.push(
    new Plataforma(
      0, height - 40, 40, 40, 54,
      imgPlataformas.terra
    )
  );

  // Itens coletáveis
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
}

function draw() {
  if (executando) {
    desenharJogo();

    // Atualiza a animação uma vez por quadro
    porta.atualizar(personagem);
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

  // Atualiza a física do personagem
  personagem.aplicarGravidade();

  if (personagem.y > height) {
    executando = false;
  }

  // Coleta de itens
  for (let i = 0; i < itens.length; i++) {
    if (personagem.checarColisao(itens[i])) {
      itens.splice(i, 1);
      pontos++;
      i--;
    }
  }

  // Colisões com as plataformas
  for (let plataforma of plataformas) {
    if (personagem.checarColisao(plataforma) === 1) {
      personagem.pisarNoChao(plataforma);
    } else if (personagem.checarColisao(plataforma) === 2) {
      personagem.baterCabeca(plataforma);
    }
  }

  // Desenha as plataformas
  for (let p of plataformas) {
    p.desenhar();
  }

  // Desenha os itens
  for (let item of itens) {
    item.desenhar();
  }

  // Desenha a porta uma única vez
  porta.desenhar();

  // Desenha o personagem por cima dos elementos do cenário
  personagem.desenhar();

  // Desenha a pontuação por último
  desenharPontuacao();
}

function keyPressed() {
  if (keyCode === UP_ARROW || key === " ") {
    personagem.pular();
  }
}
