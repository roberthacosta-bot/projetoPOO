class Personagem {
  constructor(x, y, largura, altura, animacoes) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.largura = largura;
    this.altura = altura;

    this.noChao = false;
    this.olhandoDireita = true;

    this.animacoes = animacoes;
    this.animacao = this.animacoes.run;
  }

  olharParaDireita() {
    this.olhandoDireita = true;
  }

  olharParaEsquerda() {
    this.olhandoDireita = false;
  }

  correr() {
    this.animacao = this.animacoes.run;
  }

  parar() {
    if (this.noChao) {
      this.animacao = this.animacoes.idle;
    } else {
      this.animacao = this.animacoes.jump;
    }
  }

  aplicarGravidade() {
    this.animacao.avancarFrame();

    const GRAVIDADE = 0.7;

    this.y = this.y + this.vy;
    this.vy = this.vy + GRAVIDADE;
  }

  pisarNoChao(plataforma) {
    this.y = plataforma.y - this.altura;
    this.vy = 0;
    this.noChao = true;
  }

  baterCabeca(plataforma) {
    this.y = plataforma.y + plataforma.altura;
    this.vy = 0;
  }

  pular() {
    if (this.noChao) {
      this.vy = -20;
      this.animacao = this.animacoes.jump;
      this.noChao = false;
    }
  }

  desenhar() {
    this.animacao.desenhar(
      this.x,
      this.y,
      this.largura,
      this.altura,
      this.olhandoDireita,
    );

    // if (this.olhandoDireita) {
    // } else {
    //   push();

    //   translate(this.xImg + this.larguraImg, this.y);
    //   scale(-1, 1);
    //   image(this.img, 0, 0);

    //   pop();
    // }

    // stroke("red");
    // noFill();
    // rect(this.x, this.y, this.largura, this.altura);
  }

  checarColisao(outro) {
    let resultado = 0;

    let colide =
      this.y + this.altura > outro.y &&
      this.y < outro.y + outro.altura &&
      this.x < outro.x + outro.largura &&
      this.x + this.largura > outro.x;

    if (colide) {
      let overlapLeft = this.x + this.largura - outro.x;
      let overlapRight = outro.x + outro.largura - this.x;
      let overlapTop = this.y + this.altura - outro.y;
      let overlapBottom = outro.y + outro.altura - this.y;

      let minOverlap = Math.min(
        overlapBottom,
        overlapLeft,
        overlapRight,
        overlapTop,
      );

      if (minOverlap === overlapTop && this.vy > 0) {
        // colide por cima
        resultado = 1;
      } else if (minOverlap === overlapBottom && this.vy < 0) {
        // colide por baixo
        resultado = 2;
      } else {
        resultado = 5;
      }

      // Não funciona se o personagem não se move lateralmente
      // } else if (minOverlap === overlapLeft && this.vx > 0) {
      //   // colide pela esquerda
      //   resultado = 3;
      // } else if (minOverlap === overlapRight && this.vx < 0) {
      //   // colide pela direita
      //   resultado = 4;
      // }
    }

    return resultado;
  }
}
