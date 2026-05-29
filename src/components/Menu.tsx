import * as React from 'react'

function Menu() {
  return (
    <nav className="w3-bar w3-white w3-card top-menu">
      <a href="#inicio" className="w3-bar-item brand-link">
        Livraria Aurora
      </a>
      <div className="menu-links">
        <a href="#destaques" className="w3-bar-item w3-button">
          Destaques
        </a>
        <a href="#favorito" className="w3-bar-item w3-button">
          FavoriteColor
        </a>
        <a href="#produtos" className="w3-bar-item w3-button">
          Produtos
        </a>
      </div>
    </nav>
  )
}

export default Menu
