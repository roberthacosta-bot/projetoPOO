class Plataforma {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = "#FFFFFF";
  }

  moverDireita() {
    this.x += 5;
  }

  moverEsquerda() {
    this.x -= 5;
  }

  setCor(novaCor) {
    this.cor = novaCor;
  }

  desenhar() {
    fill(this.cor);
    rect(this.x, this.y, this.largura, this.altura);
  }
}
