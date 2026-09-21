class Item {
  constructor(x, y, largura, altura, img) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.img = img;

    // Redimensiona usando a largura como base,
    // mantendo as proporções
    this.img.resize(this.largura, 0);
    // Reajusta a altura para ficar proporcional
    this.altura = img.height;
  }

  desenhar() {
    image(this.img, this.x, this.y);
  }

  moverDireita() {
    this.x += 5;
  }

  moverEsquerda() {
    this.x -= 5;
  }
}
