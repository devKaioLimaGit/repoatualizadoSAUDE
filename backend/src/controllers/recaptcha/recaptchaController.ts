import { Request, Response } from "express";
import RecaptchaService from "../../services/recaptcha/recaptchaService";

class RecaptchaController {
    async handle(req: Request, res: Response) {
        // Obtém o token do reCAPTCHA enviado pelo frontend
        const token = req.body['g-recaptcha-response'];

        console.log(token)

        if (!token) {
            res.status(400).json({ error: 'Token do reCAPTCHA não encontrado.' });
        }

        const recaptchaService = new RecaptchaService();

        try {
            // Verifica o token com o reCAPTCHA
            const recaptcha = await recaptchaService.execute(token);

            if (recaptcha.success) {
                res.status(200).json({ message: 'reCAPTCHA verificado com sucesso!' });
            } else {
                res.status(400).json({
                    message: 'Falha na verificação do reCAPTCHA.',
                    errorCodes: recaptcha['error-codes'],
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao verificar o reCAPTCHA.' });
        }
    }
}

export default new RecaptchaController();
