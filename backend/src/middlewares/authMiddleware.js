const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //Pega o header 'Authorization' da requisição
    //Ele vem no formato: "Bearer eyJhbGciOiJIUzI1NiJ9..."
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({message: 'Token não fornecido'});
    }

    //Separa "Bearer" do token em si
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token mal formatado'});
    }

    try{
        //Verifica se o token é valido usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Salva os dados do usuário na requisição para usar nas próximas etapas
        req.user = decoded;

        //chama next() = "Pode passar, esta tudo certo"
        next();
    }catch (error){
        return res.status(401).json({message: 'Token inválido ou expirado'});
    }
};

module.exports = verifyToken;