export type Produto = {
  id: number
  nome: string
  categoria: string
  autor: string
  preco: number
  estoque: number
  imagem: string
  descricao: string
  paginas: number
  editora: string
  idioma: string
  avaliacao: number
  tags: string[]
  destaque: string
}

export type ItemCarrinho = {
  produto: Produto
  quantidade: number
}
