import * as React from 'react'
import './App.css'
import Carroussel from './components/Carroussel'
import FavoriteColor from './components/FavoriteColor'
import Menu from './components/Menu'
import Tabela from './components/Tabela'
import produtos from './data/produtos.json'

function App() {
  return (
    <div className="app-shell">
      <Menu />

      <header id="inicio" className="hero-section">
        <div className="hero-copy">
          <p className="section-kicker">App Produtos React</p>
          <h1>Livraria Aurora</h1>
          <p>
            Catalogo de livros carregado a partir de um arquivo JSON local,
            com componentes React reutilizaveis e layout adaptado com W3CSS.
          </p>
          <a href="#produtos" className="w3-button w3-black hero-action">
            Ver produtos
          </a>
        </div>
      </header>

      <main>
        <section id="destaques" className="w3-content content-section">
          <div className="section-heading">
            <p className="section-kicker">Destaques</p>
            <h2>Carroussel</h2>
          </div>
          <Carroussel produtos={produtos} />
        </section>

        <section id="favorito" className="w3-light-grey full-band">
          <div className="w3-content content-section">
            <div className="section-heading">
              <p className="section-kicker">useState</p>
              <h2>FavoriteColor</h2>
            </div>
            <FavoriteColor />
          </div>
        </section>

        <section id="produtos" className="w3-content content-section">
          <div className="section-heading">
            <p className="section-kicker">Produtos</p>
            <h2>Tabela da livraria</h2>
          </div>
          <Tabela produtos={produtos} />
        </section>
      </main>
    </div>
  )
}

export default App
