import * as React from 'react'
import { useState } from 'react'
import type { Produto } from '../types'

type CarrousselProps = {
  produtos: Produto[]
}

function Carroussel({ produtos }: CarrousselProps) {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const produto = produtos[indiceAtual]

  const voltar = () => {
    setIndiceAtual((indice) => (indice === 0 ? produtos.length - 1 : indice - 1))
  }

  const avancar = () => {
    setIndiceAtual((indice) => (indice === produtos.length - 1 ? 0 : indice + 1))
  }

  return (
    <div className="carousel w3-display-container w3-card">
      <img src={produto.imagem} alt={produto.nome} className="carousel-image" />
      <div className="carousel-info w3-display-bottomleft">
        <p>{produto.categoria}</p>
        <h3>{produto.nome}</h3>
        <span>{produto.autor}</span>
      </div>
      <button
        className="w3-button w3-black w3-display-left carousel-control"
        type="button"
        onClick={voltar}
        aria-label="Produto anterior"
      >
        &#10094;
      </button>
      <button
        className="w3-button w3-black w3-display-right carousel-control"
        type="button"
        onClick={avancar}
        aria-label="Proximo produto"
      >
        &#10095;
      </button>
      <div className="carousel-dots">
        {produtos.map((item, indice) => (
          <button
            key={item.id}
            className={indice === indiceAtual ? 'dot dot-active' : 'dot'}
            type="button"
            onClick={() => setIndiceAtual(indice)}
            aria-label={`Mostrar ${item.nome}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carroussel
