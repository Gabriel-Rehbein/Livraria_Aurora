import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { criarProduto } from '../services/api'
import type { Produto } from '../types'

type FormProps = {
  onCreated?: (p: Produto) => void
}

function FormProdutos({ onCreated }: FormProps) {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [autor, setAutor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [preco, setPreco] = useState<number | ''>('')
  const [estoque, setEstoque] = useState<number | ''>('')
  const [imagem, setImagem] = useState('')
  const [descricao, setDescricao] = useState('')
  const [paginas, setPaginas] = useState<number | ''>('')
  const [editora, setEditora] = useState('')
  const [idioma, setIdioma] = useState('')
  const [avaliacao, setAvaliacao] = useState<number | ''>('')
  const [tags, setTags] = useState('')
  const [destaque, setDestaque] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const novo: any = {
      nome,
      autor,
      categoria,
      preco: Number(preco) || 0,
      estoque: Number(estoque) || 0,
      imagem,
      descricao,
      paginas: Number(paginas) || 0,
      editora,
      idioma,
      avaliacao: Number(avaliacao) || 0,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      destaque,
    }

    try {
      const resp = await criarProduto(novo)
      const criado = resp.data as Produto
      if (onCreated) onCreated(criado)
      navigate('/livros')
    } catch (err) {
      // fallback: try direct post
      try {
        const resp = await api.post('/produtos', novo)
        const criado = resp.data as Produto
        if (onCreated) onCreated(criado)
        navigate('/livros')
      } catch (e) {
        // noop
      }
    }
  }

  return (
    <form className="product-form" onSubmit={onSubmit}>
      <h2>Novo Livro</h2>
      <label>Nome</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} required />

      <label>Autor</label>
      <input value={autor} onChange={(e) => setAutor(e.target.value)} required />

      <label>Categoria</label>
      <input value={categoria} onChange={(e) => setCategoria(e.target.value)} />

      <label>Preço</label>
      <input
        type="number"
        step="0.01"
        value={preco}
        onChange={(e) => setPreco(e.target.value === '' ? '' : Number(e.target.value))}
      />

      <label>Estoque</label>
      <input
        type="number"
        value={estoque}
        onChange={(e) => setEstoque(e.target.value === '' ? '' : Number(e.target.value))}
      />

      <label>Imagem (URL)</label>
      <input value={imagem} onChange={(e) => setImagem(e.target.value)} />

      <label>Descrição</label>
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />

      <label>Páginas</label>
      <input
        type="number"
        value={paginas}
        onChange={(e) => setPaginas(e.target.value === '' ? '' : Number(e.target.value))}
      />

      <label>Editora</label>
      <input value={editora} onChange={(e) => setEditora(e.target.value)} />

      <label>Idioma</label>
      <input value={idioma} onChange={(e) => setIdioma(e.target.value)} />

      <label>Avaliação</label>
      <input
        type="number"
        step="0.1"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value === '' ? '' : Number(e.target.value))}
      />

      <label>Tags (separadas por vírgula)</label>
      <input value={tags} onChange={(e) => setTags(e.target.value)} />

      <label>Destaque</label>
      <input value={destaque} onChange={(e) => setDestaque(e.target.value)} />

      <div style={{ marginTop: 12 }}>
        <button type="submit">Salvar</button>
      </div>
    </form>
  )
}

export default FormProdutos
