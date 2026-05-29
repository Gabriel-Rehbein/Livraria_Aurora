import * as React from 'react'

type MenuProps = {
  totalItens: number
}

function Menu({ totalItens }: MenuProps) {
  return (
    <nav className="top-menu">
      <a href="#inicio" className="brand-link">
        Livraria Aurora
      </a>
      <div className="menu-links">
        <a href="#catalogo">Catalogo</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#carrinho" className="cart-link">
          Carrinho
          <span>{totalItens}</span>
        </a>
      </div>
    </nav>
  )
}

export default Menu
