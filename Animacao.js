class Animacao {
  constructor(mapeamento, sprites) {
    this.mapeamento = mapeamento;
    this.sprites = sprites;

    this.frameAtual = 0;
    this.ultimoTempo = 0;
  }

  avancarFrame() {
    let atual = millis();

    if (atual - this.ultimoTempo > 100) {
      this.frameAtual = (this.frameAtual + 1) % this.mapeamento.frames.length;
      this.ultimoTempo = atual;
    }
  }

  desenharAmpliado(x, y, zoom) {
    let largura = zoom * this.mapeamento.frameWidth;
    let altura = zoom * this.mapeamento.frameHeight;

    image(
      this.sprites,
      x,
      y,
      largura,
      altura,
      this.mapeamento.frames[this.frameAtual].x,
      this.mapeamento.frames[this.frameAtual].y,
      this.mapeamento.frameWidth,
      this.mapeamento.frameHeight,
    );
  }

  desenhar(x, y, largura, altura, olhandoDireita = true) {
    if (olhandoDireita) {
      image(
        this.sprites,
        x,
        y,
        largura,
        altura,
        this.mapeamento.frames[this.frameAtual].x,
        this.mapeamento.frames[this.frameAtual].y,
        this.mapeamento.frameWidth,
        this.mapeamento.frameHeight,
      );
    } else {
      push();
      translate(x + largura, y);
      scale(-1, 1);
      image(
        this.sprites,
        0,
        0,
        largura,
        altura,
        this.mapeamento.frames[this.frameAtual].x,
        this.mapeamento.frames[this.frameAtual].y,
        this.mapeamento.frameWidth,
        this.mapeamento.frameHeight,
      );
      pop();
    }
  }
}
