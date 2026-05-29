import * as React from 'react'
import { useState } from 'react'

function FavoriteColor() {
  const [corFavorita, setCorFavorita] = useState<'azul' | 'vermelho'>('azul')

  const isAzul = corFavorita === 'azul'
  const proximaCor = isAzul ? 'vermelho' : 'azul'

  return (
    <div className="favorite-color w3-panel w3-white w3-border">
      <p className={isAzul ? 'texto-azul' : 'texto-vermelho'}>
        A cor favorita selecionada e {corFavorita}.
      </p>
      <button
        className={`w3-button ${isAzul ? 'w3-blue' : 'w3-red'}`}
        type="button"
        onClick={() => setCorFavorita(proximaCor)}
      >
        {isAzul ? 'Azul' : 'Vermelho'}
      </button>
    </div>
  )
}

export default FavoriteColor
