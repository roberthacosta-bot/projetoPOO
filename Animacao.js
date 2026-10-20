
class Animacao {
  constructor(mapeamento, sprites) {
    this.mapeamento = mapeamento;
    this.sprites = sprites;
    this.frameAtual = 0;
    this.ultimoTempo = 0;
    this.congelada = false;
  }

  avancarFrame() {
  
    if (this.congelada) return;

    let atual = millis();

    if (atual - this.ultimoTempo >= 80) {
      this.frameAtual =
        (this.frameAtual + 1) % this.mapeamento.frames.length;

      this.ultimoTempo = atual;
    }
  }

  desenhar(x, y, largura, altura) {
    let quadro = this.mapeamento.frames[this.frameAtual];
    let escala = this.mapeamento.escala || 1;

    let larguraDesenho = largura * escala;
    let alturaDesenho = altura * escala;

    let xDesenho = x - (larguraDesenho - largura) / 2;
    let yDesenho = y + altura - alturaDesenho;
    yDesenho += 5;

    image(
      this.sprites,
      xDesenho,
      yDesenho,
      larguraDesenho,
      alturaDesenho,
      quadro.x,
      quadro.y,
      this.mapeamento.frameWidth,
      this.mapeamento.frameHeight
    );
  }
}
