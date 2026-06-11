import * as React from 'react'
import { NavLink } from 'react-router-dom'

type MenuProps = {
  totalItens: number
}

function Menu({ totalItens }: MenuProps) {
  return (
    <nav className="top-menu">
      <NavLink to="/livros" className="brand-link">
        Livraria Aurora
      </NavLink>
      <div className="menu-links">
        <NavLink to="/livros">Livros</NavLink>
        <NavLink to="/novo">Novo Livro</NavLink>
        <NavLink to="/carrinho" className="cart-link">
          Carrinho
          <span>{totalItens}</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Menu
