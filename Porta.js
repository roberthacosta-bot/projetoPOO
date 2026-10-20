
class Porta {
  constructor(x, y, largura, altura, imagem) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.imagem = imagem;
  }

  desenhar() {
    image(
      this.imagem,
      this.x + cenarioX,
      this.y,
      this.largura,
      this.altura
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
}
