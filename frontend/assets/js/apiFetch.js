async function handleSendEmail(e) {
  e.preventDefault();

  // Função para formatar CPF (12345678901 → 123.456.789-01)
  function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // Função para formatar telefone (81985801560 → (81) 98580-1560)
  function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Função para formatar data (2002-10-31 → 31-10-2002)
  function formatDate(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
  }

  // Verifica se os campos necessários estão preenchidos
  const name = document.getElementById("name").value.trim();
  const mother = document.getElementById("mother").value.trim();
  const email = document.getElementById("email").value.trim();
  const rg = document.getElementById("rg").value.trim();
  const cpf = formatCPF(document.getElementById("cpf").value.trim());
  const tel = formatPhone(document.getElementById("tel").value.trim());
  const zip = document.getElementById("zip").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const neighborhood = document.getElementById("neighborhood").value.trim();
  const birth = formatDate(document.getElementById("birth").value.trim());
  const ageinyears = document.getElementById("ageinyears").value.trim();
  const position = document.getElementById("position").value.trim();
  const experienceExit = document.getElementById("experienceExit").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const registrationCouncil = document.getElementById("registrationCouncil").value.trim();
  const deficiency = document.getElementById("deficiency").value.trim();
  const container = document.querySelector(".container")
  // Validação de campos obrigatórios
  if (!name || !mother || !email || !rg || !cpf || !tel || !zip || !birth || !ageinyears || !position || !experienceExit || !experience || !registrationCouncil) {
    Toastify({
      text: "Por favor, preencha todos os campos obrigatórios.",
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)",
      duration: 3000,
    }).showToast();
    return; // Não envia o formulário se faltar algum dado
  }

  // Verifica se os campos de endereço são obrigatórios
  if (!address || !city || !neighborhood) {
    Toastify({
      text: "Por favor, preencha o endereço completo com o CEP.",
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)",
      duration: 3000,
    }).showToast();
    return; // Não envia o formulário sem o endereço
  }

  const formData = new FormData(e.target);
  try {
    const response = await fetch("http://186.208.8.196:3000/send", {
      method: "POST",
      body: formData, // Envia o objeto FormData diretamente
    });
  
    if (response.ok) {
      const responseData = await response.json(); // Alterei de 'data' para 'responseData'
      console.log(responseData);
      Toastify({
        text: `Cadastro realizado com sucesso seu protocolo é : ${responseData}`,
        backgroundColor: "linear-gradient(to right, #4caf50, #81c784)",
        duration: 100000,
      }).showToast();
      e.target.reset(); // Limpa o formulário após o envio
      container.classList.remove("container")
      container.classList.add("container-model")
      container.innerHTML = `
        <div class="model">
          <h1>INSCRIÇÃO REALIZADA COM SUCESSO!</h1>
          <h2>Protocolo: ${responseData}</h2>
        </div>
      `;
    } else {
      Toastify({
        text: "Candidato já inscrito.",
        backgroundColor: "linear-gradient(to right, #f44336, #e57373)",
        duration: 3000,
      }).showToast();
    }
  } catch (error) {
    Toastify({
      text: "Erro de rede. Tente novamente mais tarde.",
      backgroundColor: "linear-gradient(to right, #f44336, #e57373)",
      duration: 3000,
    }).showToast();
  }
}


async function fetchAPTCHA(){

}