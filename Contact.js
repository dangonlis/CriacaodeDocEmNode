// Importa a biblioteca XLSX
const XLSX = require('xlsx');

// Define a URL da API Random User
const url = 'https://randomuser.me/api/?results=200&nat=BR,GB,NZ,FR,DK,US&inc=name,phone,email';


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
let FirstName = getNextFirstName();

function getNextFirstName() {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  

  const firstNameValue = `CON_FN_${formattedDateTime}_${counter2.toString().padStart(5, '0')}`;

  counter2++;

  return firstNameValue;
}

console.log(getNextFirstName()); 


let counter3 = 0;
let LastName = getNextLastName();

function getNextLastName() {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  const LastName = `CON_LN_${formattedDateTime}_${counter3.toString().padStart(5, '0')}`;

  counter3++;

  return LastName;
}

let counter4 = 0;
let externalKeyContact = getNextExternalKeyContact();

function getNextExternalKeyContact() {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString().replace(/[-:.T]/g, '').slice(0, 14);
  const externalKeyContact = `EK_CON_${formattedDateTime}_${counter4.toString().padStart(5, '0')}`;

  counter4++;

  return externalKeyContact;
}


// Mapeia a resposta da API Random User para a lista de objetos de usuários
fetch(url)
  .then(response => response.json())
  .then(data => {
    const users = data.results.map(user => {

      const externalKeyAccount = getNextExternalKeyAccount();
      console.log(externalKeyAccount);

      const FirstName = getNextFirstName();
      console.log(FirstName);

      const LastName = getNextLastName();
      console.log(LastName);

      const externalKeyContact = getNextExternalKeyContact();
      console.log(externalKeyContact);

      const email = user.email;

      const action = 'Insert';
      return {'FirstName': FirstName, 'LastName': LastName,'EXTERNAL_KEY_c@Account@AccountLink_c': externalKeyAccount, 'EXTERNAL_KEY_c@Contact': externalKeyContact,'Email' : email,'Action' : action };
    });

    // Cria uma planilha usando as informações dos usuários
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, "Contact");

    // Salva a planilha em um arquivo com o nome 'contact.xlsx'
    XLSX.writeFile(wb, "Contact.xlsx");
  })
  .catch(error => {
    console.error('Erro: ', error);
  });