import { Request, Response } from "express";

class ReturnNameController {
    async handle(req: Request, res: Response) {
        const { name } = req.query;
        console.log(name)
        res.send(`<h1>Olá, bom dia ${name}</h1>`);
    }
}
export default new ReturnNameController();