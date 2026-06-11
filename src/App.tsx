import * as React from 'react'
import { useMemo, useState } from 'react'
import './App.css'
import Carroussel from './components/Carroussel'
import FavoriteColor from './components/FavoriteColor'
import Menu from './components/Menu'
import Tabela from './components/Tabela'
import FormProdutos from './components/FormProdutos'
import { getProdutos } from './services/api'
import type { ItemCarrinho, Produto } from './types'
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function App() {
  const [livros, setLivros] = useState<Produto[]>([])

  const fetchProdutos = async () => {
    try {
      const resp = await getProdutos()
      setLivros(resp.data)
    } catch (e) {
      // fallback: try fetch local file
      try {
        const local = await import('./data/produtos.json')
        setLivros(local.default as Produto[])
      } catch (_) {
        setLivros([])
      }
    }
  }

  useEffect(() => {
    void fetchProdutos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreated = (p: Produto) => {
    setLivros((s) => [...s, p])
  }
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
  const [livroSelecionado, setLivroSelecionado] = useState<Produto | null>(null)
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])

  const categorias = useMemo(
    () => ['Todos', ...Array.from(new Set(livros.map((livro) => livro.categoria)))],
    [livros],
  )

  const livrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    return livros.filter((livro) => {
      const combinaCategoria =
        categoriaAtiva === 'Todos' || livro.categoria === categoriaAtiva
      const combinaBusca =
        livro.nome.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.tags.some((tag) => tag.toLowerCase().includes(termo))

      return combinaCategoria && combinaBusca
    })
  }, [busca, categoriaAtiva, livros])

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)
  const subtotal = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0,
  )
  const frete = subtotal >= 120 || subtotal === 0 ? 0 : 14.9
  const total = subtotal + frete

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((itens) => {
      const itemAtual = itens.find((item) => item.produto.id === produto.id)

      if (itemAtual) {
        return itens.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: Math.min(item.quantidade + 1, produto.estoque),
              }
            : item,
        )
      }

      return [...itens, { produto, quantidade: 1 }]
    })
  }

  const alterarQuantidade = (produtoId: number, quantidade: number) => {
    setCarrinho((itens) =>
      itens
        .map((item) =>
          item.produto.id === produtoId
            ? {
                ...item,
                quantidade: Math.max(0, Math.min(quantidade, item.produto.estoque)),
              }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    )
  }

  const MainContent = () => (
    <>
      <header id="inicio" className="hero-section">
        <div className="hero-copy">
          <p className="section-kicker">Livros novos, classicos e essenciais</p>
          <h1>Livraria Aurora</h1>
          <p>
            Escolha seu proximo livro, veja detalhes completos e monte seu
            carrinho em uma loja simples, bonita e funcionando.
          </p>
          <div className="hero-actions">
            <a href="#catalogo" className="primary-action">
              Ver catalogo
            </a>
            <a href="#carrinho" className="secondary-action">
              Ir ao carrinho
            </a>
          </div>
        </div>
        <div className="hero-book">
          {livros[0] ? (
            <>
              <span>{livros[0].destaque}</span>
              <strong>{livros[0].nome}</strong>
              <small>{livros[0].autor}</small>
            </>
          ) : (
            <span>Carregando...</span>
          )}
        </div>
      </header>

      <main>
        <section id="destaques" className="content-section highlights-section">
          <div className="section-heading">
            <p className="section-kicker">App Produtos React</p>
            <h2>Destaques da livraria</h2>
          </div>
          <Carroussel produtos={livros} />
        </section>

        <section id="catalogo" className="content-section catalog-section">
          <div className="section-heading">
            <p className="section-kicker">Catalogo</p>
            <h2>Livros a pronta entrega</h2>
          </div>
          <div className="shop-layout">
            <aside className="filters-panel" aria-label="Filtros da loja">
              <label htmlFor="busca">Buscar livro</label>
              <input
                id="busca"
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Titulo, autor ou tema"
              />

              <div className="category-list">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    className={categoria === categoriaAtiva ? 'active' : ''}
                    type="button"
                    onClick={() => setCategoriaAtiva(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </aside>

            <div className="book-grid">
              {livrosFiltrados.map((livro) => (
                <article className="book-card" key={livro.id}>
                  <button
                    className="book-image-button"
                    type="button"
                    onClick={() => setLivroSelecionado(livro)}
                    aria-label={`Ver detalhes de ${livro.nome}`}
                  >
                    <img src={livro.imagem} alt={livro.nome} />
                    <span>{livro.destaque}</span>
                  </button>
                  <div className="book-card-body">
                    <p className="book-category">{livro.categoria}</p>
                    <h3>{livro.nome}</h3>
                    <p className="book-author">{livro.autor}</p>
                    <div className="book-meta">
                      <span>{livro.avaliacao.toFixed(1)} / 5</span>
                      <span>{livro.estoque} em estoque</span>
                    </div>
                    <div className="book-buy-row">
                      <strong>{formatarPreco(livro.preco)}</strong>
                      <button type="button" onClick={() => adicionarAoCarrinho(livro)}>
                        Adicionar
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {livrosFiltrados.length === 0 && (
                <div className="empty-state">
                  <h3>Nenhum livro encontrado</h3>
                  <p>Tente buscar por outro titulo, autor ou categoria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="beneficios" className="benefits-band">
          <div className="content-section benefits-grid">
            <div>
              <span>Retirada</span>
              <strong>Separe online e retire na loja</strong>
            </div>
            <div>
              <span>Frete</span>
              <strong>Gratis acima de R$ 120</strong>
            </div>
            <div>
              <span>Curadoria</span>
              <strong>Classicos, tecnologia e ficcao</strong>
            </div>
          </div>
        </section>

        <section id="favorito" className="content-section favorite-section">
          <div className="section-heading">
            <p className="section-kicker">useState</p>
            <h2>FavoriteColor</h2>
          </div>
          <FavoriteColor />
        </section>

        <section id="tabela" className="content-section table-section">
          <div className="section-heading">
            <p className="section-kicker">Arquivo JSON local</p>
            <h2>Tabela de produtos</h2>
          </div>
          <Tabela produtos={livros} />
        </section>

        <section id="carrinho" className="content-section cart-section">
          <div className="section-heading">
            <p className="section-kicker">Carrinho</p>
            <h2>Sua compra</h2>
          </div>
          <div className="cart-layout">
            <div className="cart-items">
              {carrinho.length === 0 ? (
                <div className="empty-cart">
                  <h3>Seu carrinho esta vazio</h3>
                  <p>Adicione livros do catalogo para ver o resumo da compra.</p>
                </div>
              ) : (
                carrinho.map((item) => (
                  <article className="cart-item" key={item.produto.id}>
                    <img src={item.produto.imagem} alt={item.produto.nome} />
                    <div>
                      <h3>{item.produto.nome}</h3>
                      <p>{item.produto.autor}</p>
                      <strong>{formatarPreco(item.produto.preco)}</strong>
                    </div>
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          alterarQuantidade(item.produto.id, item.quantidade - 1)
                        }
                        aria-label={`Diminuir quantidade de ${item.produto.nome}`}
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button
                        type="button"
                        onClick={() =>
                          alterarQuantidade(item.produto.id, item.quantidade + 1)
                        }
                        aria-label={`Aumentar quantidade de ${item.produto.nome}`}
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <aside className="checkout-card">
              <h3>Resumo</h3>
              <div>
                <span>Itens</span>
                <strong>{totalItens}</strong>
              </div>
              <div>
                <span>Subtotal</span>
                <strong>{formatarPreco(subtotal)}</strong>
              </div>
              <div>
                <span>Frete</span>
                <strong>{frete === 0 ? 'Gratis' : formatarPreco(frete)}</strong>
              </div>
              <div className="checkout-total">
                <span>Total</span>
                <strong>{formatarPreco(total)}</strong>
              </div>
              <button type="button" disabled={carrinho.length === 0}>
                Finalizar pedido
              </button>
            </aside>
          </div>
        </section>
      </main>

      {livroSelecionado && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
        >
          <article className="book-modal">
            <button
              className="modal-close"
              type="button"
              onClick={() => setLivroSelecionado(null)}
              aria-label="Fechar detalhes"
            >
              x
            </button>
            <img src={livroSelecionado.imagem} alt={livroSelecionado.nome} />
            <div className="modal-content">
              <p className="book-category">{livroSelecionado.categoria}</p>
              <h2 id="modal-titulo">{livroSelecionado.nome}</h2>
              <p className="book-author">por {livroSelecionado.autor}</p>
              <p>{livroSelecionado.descricao}</p>
              <div className="detail-list">
                <span>{livroSelecionado.paginas} paginas</span>
                <span>{livroSelecionado.editora}</span>
                <span>{livroSelecionado.idioma}</span>
                <span>{livroSelecionado.avaliacao.toFixed(1)} / 5</span>
              </div>
              <div className="tag-list">
                {livroSelecionado.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="modal-buy">
                <strong>{formatarPreco(livroSelecionado.preco)}</strong>
                <button
                  type="button"
                  onClick={() => {
                    adicionarAoCarrinho(livroSelecionado)
                    setLivroSelecionado(null)
                  }}
                >
                  Colocar no carrinho
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  )

  return (
    <div className="app-shell">
      <Menu totalItens={totalItens} />
      <main>
        <Routes>
          <Route path="/livros" element={<MainContent />} />
          <Route path="/novo" element={<FormProdutos onCreated={handleCreated} />} />
          <Route path="/" element={<Navigate to="/livros" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
