import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
})

export default api

export const getProdutos = () => api.get('/produtos')
export const criarProduto = (produto: any) => api.post('/produtos', produto)
