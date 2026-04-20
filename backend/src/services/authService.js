const userRepository = require ('../repositories/userRepository');
const {comparePassword} = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');

const authService = {
    login: async (email, password) => {
        //1. Verifica se existe um usuário com esse e-mail
        const user = await userRepository.findByemail(email);
        if (!user) {
            //Lança um erro com status 401 (não autorizado)
            const error = new Error('Credenciais inválidas');
            error.status = 401;
            throw error;            
        }

        //2.Verifica se a senha digitada bate com o hash salvo no banco
        const passwordMatch = await comparePassword(password, user.password);
        if(!passwordMatch){
            const error = new Error('Credenciais inválidas');
            error.status = 401;
            throw error;
        }

        //3. Gera o token JWT (o "crachá" do usuário)
        const token = jwt.sign(
            //Payload: dados que ficam dentro do token
            {id: user._id, email: user.email, role: user.role},
            //Chave secreta (dp .env)
            process.env.JWT_SECRET,
            //Expira em 8 horas
            {expiresIn: '8h'}
        );

        //4. Retorna o token e alguns dados do usuário (sem a senha)
        return{
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
};

module.exports = authService;