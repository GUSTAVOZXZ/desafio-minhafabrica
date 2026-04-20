import axios from 'axios';

// Cria uma instância do Axios já configurada com a URL base do backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
});

// Interceptor de REQUEST:
// Antes de enviar qualquer requisição, adiciona o token JWT no header
api.interceptors.request.use((config) => {
  // Pega o token salvo no localStorage do navegador
  const token = localStorage.getItem('token');
  if (token) {
    // Adiciona no header no formato que o backend espera
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPONSE:
// Se o backend retornar 401 (não autorizado), desloga o usuário
api.interceptors.response.use(
  (response) => response, // se deu certo, retorna normal
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;