import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  mother: string;
  housenumber: string;
  complement: string;
  rg: string;
  cpf: string;
  tel: string;
  zip: string;
  address: string;
  city: string;
  neighborhood: string;
  birth: string;
  ageinyears: string;
  position: string;
  experienceExit: string;
  experience: string;
  registrationCouncil: string;
  deficiency: string;
  deficiencyContext: string;
  advice: string;
  jury : string;
  organ: string;
  term: string;
}

// Função para formatar CPF (12345678901 → 123.456.789-01)
function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar telefone (81985801560 → (81) 98580-1560)
function formatPhone(phone: string) {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

// Função para formatar data (2002-10-31 → 31-10-2002)
function formatDate(date: string) {
  return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
}

class UserService {
  async execute({
    name,
    email,
    mother,
    housenumber,
    complement,
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
    advice,
    jury,
    organ,
    term
  }: UserRequest) {
    // Verificar se o email foi enviado
    if (!email) {
      throw new Error("Email is required");
    }

    // Verificar se o email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const protocolhasg = Math.floor(Math.random() * 900000) + 100000; // Gera um número aleatório entre 100000 e 999999

    // Criação do usuário no banco de dados
    const user = await prismaClient.user.create({
      data: {
        name,
        protocol: String(protocolhasg),
        email,
        mother,
        housenumber,
        complement,
        rg,
        cpf: formatCPF(cpf),
        tel: formatPhone(tel),
        zip,
        address,
        city,
        neighborhood,
        birth: formatDate(birth),
        ageinyears,
        position,
        experienceExit,
        experience,
        registrationCouncil,
        deficiency,
        deficiencyContext,
        advice,
        jury,
        organ,
        term
      },
    });

    return protocolhasg;
  }
}

export { UserService };
