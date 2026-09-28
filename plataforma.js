class Plataforma {
  constructor(x, y, largura, altura, n, img) {
    this.x = x;
    this.y = y;
    this.largura = largura * n;
    this.larguraImg = largura;
    this.n = n;
    this.img = img;

    this.img.resize(largura, 0);
    this.altura = this.img.height;

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
    for (let i = 0; i < this.n; i++) {
      image(this.img, this.x + i * this.larguraImg, this.y);
    }
  }
}
