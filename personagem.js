class Personagem {
  constructor(x, y, largura, altura, img) {
    this.x = x + 30;
    this.xImg = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.largura = largura - 70;
    this.larguraImg = largura;

    this.img = img;

    /*this.img.resize(this.larguraImg, 0);
    this.altura = img.height;*/
  }

  mover() {
    const GRAVIDADE = 0.7;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vy = this.vy + GRAVIDADE;
  }

  pisarNoChao(plataforma) {
    this.y = plataforma.y - this.altura;
    this.vy = 0;
  }

  baterCabeca(plataforma) {
    this.y = plataforma.y + plataforma.altura;
    this.vy = 0;
  }
  andarDireita() {
    this.vx = 5;
  }

  andarEsquerda() {
    this.vx = -5;
  }

  parar() {
    this.vx = 0;
  }

  pular() {
    this.vy = -20;
  }

  desenhar() {
    image(this.img, this.xImg, this.y);
   /* stroke("red");
    noFill();
    rect(this.x, this.y, this.largura, this.altura);*/
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