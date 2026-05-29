import * as React from 'react'
import type { Produto } from '../types'

type TabelaProps = {
  produtos: Produto[]
}

function Tabela({ produtos }: TabelaProps) {
  return (
    <div className="w3-responsive">
      <table className="w3-table-all w3-hoverable product-table">
        <thead>
          <tr className="w3-black">
            <th>Codigo</th>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Autor</th>
            <th>Preco</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.autor}</td>
              <td>
                {produto.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>{produto.estoque}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tabela
