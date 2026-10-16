class Porta {
  constructor(x, y, largura, altura, imagem) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.imagem = imagem;
    this.estado = 0;
    this.quadro = 0;
    this.tempoAnimacao = 0;
    this.intervalo = 10;
    this.ativada = false;
    this.tempoEntrada = 0;
  }

 
desenhar() {
  let larguraQuadro = this.imagem.width / 3;
  let alturaQuadro = this.imagem.height;

  image(this.imagem, this.x, this.y, this.largura, this.altura, this.quadro * larguraQuadro, 0, larguraQuadro, alturaQuadro);
}


  verificarColisao(personagem) {
    return (
      personagem.x + personagem.largura > this.x &&
      personagem.x < this.x + this.largura &&
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

    this.tempoAnimacao++;

    if (this.tempoAnimacao >= this.intervalo) {
      this.tempoAnimacao = 0;

      if (this.estado === 1) {
        this.quadro++;

        if (this.quadro >= 2) {
          this.quadro = 2;
          this.estado = 2;
        }
      }

      else if (this.estado === 3) {
        this.quadro--;

        if (this.quadro <= 0) {
          this.quadro = 0;
          this.estado = 0;
        }
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