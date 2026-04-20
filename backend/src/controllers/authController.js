const authService = require('../services/authService');

const authController = {
    login: async (req, res, next) => {
        try {
            //Pega email e senha do corpo da requisição
            const {email, password} = req.body;

            //Valida se os campos foram enviados
            if(!email || !password) {
                return res.status(400).json({message: 'E-mail e senha são obrigatórios'})
            }

            //Passa para o service processar
            const result = await authService.login(email, password);

            //Retorna 200(sucesso) com o token e dados do usuário
            res.status(200).json(result);
        }catch (error){
            //Passa o erro para o middleware de erros tratar
            next(error);
        }
    },
};

module.exports = authController;