import nodemailer from "nodemailer";
require("dotenv").config();
import path from "path"; // Importando o módulo path para lidar com os caminhos de arquivos

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
  neighborhood: string;
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

class SendEmailService {
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
    neighborhood,
    birth,
    ageinyears,
    position,
    experienceExit,
    experience,
    registrationCouncil,
    deficiency,
    deficiencyContext,
    swornStatement,
  }: UserRequest) {
    // Cria o transporter usando SMTP
    const transporter = nodemailer.createTransport({
      host: "mail.paulista.pe.gov.br",
      port: 465,
      secure: true,
      tls: {
        rejectUnauthorized: false, // Ignora o erro do certificado
      },
      auth: {
        user: "simplificada.saude@paulista.pe.gov.br",
        pass: "$Mudar@2025!#",
      },
      logger: true,
      //debug: true
    });

    // Cria o corpo HTML com uma tabela
    const htmlContent = `
      <h1>Dados do Formulário</h1>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 800px;">
        <thead>
          <tr>
            <th style="background-color: #f2f2f2; text-align: left;">Campo</th>
            <th style="background-color: #f2f2f2; text-align: left;">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Nome:</strong></td><td>${name}</td></tr>
          <tr><td><strong>E-mail:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Nome da Mãe:</strong></td><td>${mother}</td></tr>
          <tr><td><strong>RG:</strong></td><td>${rg}</td></tr>
          <tr><td><strong>CPF:</strong></td><td>${formatCPF(cpf)}</td></tr>
          <tr><td><strong>Telefone:</strong></td><td>${formatPhone(tel)}</td></tr>
          <tr><td><strong>CEP:</strong></td><td>${zip}</td></tr>
          <tr><td><strong>Endereço:</strong></td><td>${address}</td></tr>
          <tr><td><strong>Cidade:</strong></td><td>${city}</td></tr>
          <tr><td><strong>Bairro:</strong></td><td>${neighborhood}</td></tr>
          <tr><td><strong>Data de Nascimento:</strong></td><td>${formatDate(birth)}</td></tr>
          <tr><td><strong>Idade:</strong></td><td>${ageinyears} anos</td></tr>
          <tr><td><strong>Cargo:</strong></td><td>${position}</td></tr>
          <tr><td><strong>Experiência de Saída:</strong></td><td>${experienceExit}</td></tr>
          <tr><td><strong>Experiência:</strong></td><td>${experience}</td></tr>
          <tr><td><strong>Registro no Conselho:</strong></td><td>${registrationCouncil}</td></tr>
          <tr><td><strong>Deficiência:</strong></td><td>${deficiency}</td></tr>
          <tr><td><strong>Contexto da Deficiência:</strong></td><td>${deficiencyContext}</td></tr>
          <tr><td><strong>Declaração de Bens:</strong></td><td>${swornStatement}</td></tr>
        </tbody>
      </table>
    `;

    // Define as opções do e-mail
    const mailOptions = {
      from: `simplificada.saude@paulista.pe.gov.br`,
      to: `dev.kaiolima@gmail.com, kaiolima.asus@gmail.com`,
      subject: "Formulário de Cadastro - Dados Submetidos",
      html: htmlContent,
      attachments: [
        {
          filename: `${cpf}.pdf`, // Nome do arquivo a ser enviado
          path: path.join(__dirname, "..", "..", "..", "tmp", `${cpf}.pdf`), // Caminho para o arquivo
        },
      ],
    };

    // Envia o e-mail
    try {
      const info = await transporter.sendMail(mailOptions);
      return `E-mail enviado com sucesso!`;
    } catch (error) {
      throw new Error("Erro ao enviar e-mail");
    }
  }
}

export { SendEmailService };
