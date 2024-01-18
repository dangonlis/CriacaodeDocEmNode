// Importa a biblioteca XLSX
const XLSX = require('xlsx');

const FILENAME = 'Account.xlsx';

// Lê os dados do arquivo original e remove a primeira linha (que contém o cabeçalho)
const originalWorkbook = XLSX.readFile(FILENAME);
const originalSheet = originalWorkbook.Sheets['Account'];
const originalData = XLSX.utils.sheet_to_json(originalSheet, { header: 1 });
originalData.shift();

// Atualiza os dados e adiciona uma nova linha de cabeçalho
const updatedData = originalData.map(user => {
  if (user[3] === "Insert") {
  
    // Atualiza o valor da coluna "Action"
    user[3] = "Update";
  }

  return user;
});

// Adiciona a nova linha de cabeçalho
updatedData.unshift(['EXTERNAL_KEY_c@Account', 'Name', 'Phone', 'Action']);

// Cria a nova planilha e adiciona os dados atualizados
const updatedSheet = XLSX.utils.aoa_to_sheet(updatedData);

// Remove a planilha existente e adiciona a nova planilha atualizada
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, updatedSheet, 'Account');
XLSX.writeFile(workbook, 'Account-Atualizado.xlsx');