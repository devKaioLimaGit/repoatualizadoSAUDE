import prismaClient from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    mother: string;
    rg: string;
    cpf: string;
    tel: string;
    zip: string;
    address: string;
    city: string;
    bairro: string;
    birth: string;
    ageinyears: string;
    position: string;
    experienceExit: string;
    experience: string;
    registrationCouncil: string;
    deficiency: string;
    deficiencyContext: string;
    swornStatement: string;
}

class UserService {
    async execute({
        name,
        email,
        mother,
        rg,
        cpf,
        tel,
        zip,
        address,
        city,
        bairro,
        birth,
        ageinyears,
        position,
        experienceExit,
        experience,
        registrationCouncil,
        deficiency,
        deficiencyContext,
        swornStatement
    }: UserRequest) {

        // Verificar se o email foi enviado
        if (!email) {
            throw new Error("Email is required");
        }

        // Verificar se o email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const protocolhasg = Math.floor(Math.random() * 900000) + 100000;  // Gera um número aleatório entre 100000 e 999999


        // Criação do usuário no banco de dados
        const user = await prismaClient.user.create({
            data: {
                name,
                protocol: String(protocolhasg),
                email,
                mother,
                rg,
                cpf,
                tel,
                zip,
                address,
                city,
                bairro,
                birth,
                ageinyears,
                position,
                experienceExit,
                experience,
                registrationCouncil,
                deficiency,
                deficiencyContext,
                swornStatement
            }
        });

        return protocolhasg;
    }
}

export { UserService };
