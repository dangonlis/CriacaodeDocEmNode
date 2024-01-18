// Importa a biblioteca XLSX
const XLSX = require('xlsx');

// Define a URL da API Random User
const url = 'https://randomuser.me/api/?results=200&nat=BR,GB,NZ,FR,DK,US&inc=name,phone';


// Defina uma variável de contador fora do escopo da função (para que mantenha seu valor)
let counter = 0;

// Função para obter a data, hora e minutos formatados e incrementar o contador
function getNextExternalKeyAccount() {
  const currentDate = new Date();

  const formattedDateTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 14);

  const externalKeyAccount = `EK_AN_${formattedDateTime}_${counter.toString().padStart(5, '0')}`;

  counter++;

  return externalKeyAccount;
}

console.log(getNextExternalKeyAccount()); // Aqui você terá o valor inicializado de externalKeyAccount


let counter2 = -1;
let Name = getNextName();

function getNextName() {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  

  const NameValue = `AN_${formattedDateTime}_${counter2.toString().padStart(5, '0')}`;

  counter2++;

  return NameValue;
}

console.log(getNextName()); 

// Mapeia a resposta da API Random User para a lista de objetos de usuários
fetch(url)
  .then(response => response.json())
  .then(data => {
    const users = data.results.map(user => {

      const externalKeyAccount = getNextExternalKeyAccount();
      console.log(externalKeyAccount);

      const Name = getNextName();
      console.log(Name);

      const phoneNumber = user.phone.replace(/\D/g, '');
      const action = 'Insert';
      return {'EXTERNAL_KEY_c@Account': externalKeyAccount, 'Name': Name, 'Phone': phoneNumber, 'Action' : action };
    });

    // Cria uma planilha usando as informações dos usuários
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, "Account");

    // Salva a planilha em um arquivo com o nome 'dados.xlsx'
    XLSX.writeFile(wb, "Account.xlsx");
  })
  .catch(error => {
    console.error('Erro: ', error);
  });