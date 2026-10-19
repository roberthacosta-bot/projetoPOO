
class Porta {
  constructor(x, y, largura, altura, imagem, mapeamento) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.imagem = imagem;
    this.mapeamento = mapeamento;

    this.estado = 0;
    this.quadro = 0;
    this.tempoAnimacao = 0;
    this.intervalo = 10;
    this.ativada = false;
    this.tempoEntrada = 0;
  }

  desenhar() {
    const frame = this.mapeamento.frames[this.quadro];

    image(
      this.imagem,
      this.x + cenarioX,
      this.y,
      this.largura,
      this.altura,
      frame.x,
      frame.y,
      this.mapeamento.frameWidth,
      this.mapeamento.frameHeight
    );
  }

  verificarColisao(personagem) {
    const portaTelaX = this.x + cenarioX;

    return (
      personagem.x + personagem.largura > portaTelaX &&
      personagem.x < portaTelaX + this.largura &&
      personagem.y + personagem.altura > this.y &&
      personagem.y < this.y + this.altura
    );
  }

  atualizar(personagem) {
    if (
      this.estado === 0 &&
      this.verificarColisao(personagem)
    ) {
      this.estado = 1;
      this.ativada = true;
      this.tempoAnimacao = 0;
    }

    if (this.estado !== 1 && this.estado !== 3) {
      return;
    }

    this.tempoAnimacao++;

    if (this.tempoAnimacao < this.intervalo) {
      return;
    }

    this.tempoAnimacao = 0;

    // Abrindo: quadro 0 até quadro 5
    if (this.estado === 1) {
      this.quadro++;

      if (this.quadro >= this.mapeamento.frames.length - 1) {
        this.quadro = this.mapeamento.frames.length - 1;
        this.estado = 2;
      }
    }

    // Fechando: quadro 5 até quadro 0
    else if (this.estado === 3) {
      this.quadro--;

      if (this.quadro <= 0) {
        this.quadro = 0;
        this.estado = 0;
        this.ativada = false;
      }
    }
  }

  fechar() {
    if (this.estado === 2) {
      this.estado = 3;
      this.tempoAnimacao = 0;
    }
  }

  estaAberta() {
    return this.estado === 2;
  }
}
