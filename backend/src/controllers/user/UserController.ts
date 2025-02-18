import { Request, Response } from "express";
import { UserService } from "../../services/user/userService";
import { SendEmailService } from "../../services/email/SendEmail";

class UserController {
  async handle(req: Request, res: Response): Promise<void> {
    const {
      name,
      email,
      mother,
      rg,
      cpf,
      tel,
      zip,
      address,
      city,
      neighborhood,
      birth,
      ageinyears,
      position,
      experienceExit,
      experience,
      registrationCouncil,
      deficiency,
      deficiencyContext,
      swornStatement
    } = req.body;

    // Verificar se o arquivo foi enviado
    if (!req.file) {
      res.status(400).json({ error: "File upload is required" });
      return;
    }
    
    try {
      const userService = new UserService();
      const sendEmailService = new SendEmailService();
      
      const user = await userService.execute({
        name,
        email,
        mother,
        rg,
        cpf,
        tel,
        zip,
        address,
        city,
        neighborhood,
        birth,
        ageinyears,
        position,
        experienceExit,
        experience,
        registrationCouncil,
        deficiency,
        deficiencyContext,
        swornStatement
      });

      sendEmailService.execute({
        name,
        email,
        mother,
        rg,
        cpf,
        tel,
        zip,
        address,
        city,
        neighborhood,
        birth,
        ageinyears,
        position,
        experienceExit,
        experience,
        registrationCouncil,
        deficiency,
        deficiencyContext,
        swornStatement
      });

      res.status(201).json(user);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
