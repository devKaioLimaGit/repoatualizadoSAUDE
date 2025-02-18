import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class RecaptchaService {
  async execute(token: string) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Sua chave secreta do reCAPTCHA

    if (!secretKey) {
      throw new Error('Chave secreta do reCAPTCHA não configurada');
    }

    try {
      // Requisição para a API de verificação do reCAPTCHA
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: secretKey,  // A chave secreta
          response: token,    // O token enviado pelo usuário
        },
      });

      // Retorna a resposta da API
      return response.data; // Agora a função retorna a resposta da API
    } catch (error) {
      throw new Error('Erro ao verificar o token do reCAPTCHA');
    }
  }
}

export default RecaptchaService;
