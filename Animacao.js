
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
      this.frameAtual =
        (this.frameAtual + 1) % this.mapeamento.frames.length;

      this.ultimoTempo = atual;
    }
  }

  desenhar(x, y, largura, altura) {
    let quadro = this.mapeamento.frames[this.frameAtual];

    image(
      this.sprites,
      x,
      y,
      largura,
      altura,
      quadro.x,
      quadro.y,
      this.mapeamento.frameWidth,
      this.mapeamento.frameHeight
    );
  }
}
