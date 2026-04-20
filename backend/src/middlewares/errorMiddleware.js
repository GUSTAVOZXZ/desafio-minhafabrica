// Middleware global de tratamento de erros
// Ele captura QUALQUER erro que acontecer na aplicação
const errorMiddleware = (err, req, res, next) => {
    //Se o erro tiver um status definido, usa ele. Senão, usa 500 (erro interno)
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';

    console.error('❌ [${status}] ${message}');

    res.status(status).json({message});
};

module.exports = errorMiddleware;