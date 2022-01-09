const form = document.getElementById('transactionForm');

form.addEventListener('submit',function(e){
    e.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionTable = document.getElementById('transactionTable');
    let newTransactionRow = transactionTable.insertRow(-1);

    insertRowinTable(transactionFormData.get('transactionType'), newTransactionRow);
    insertRowinTable(transactionFormData.get('transactionDescription'), newTransactionRow);
    insertRowinTable(transactionFormData.get('transactionAmount'), newTransactionRow);
    insertRowinTable(transactionFormData.get('transactionCategory'), newTransactionRow);
});

// function convertFormDataToTransactionObj(transactionFormData){
//     let transactionType = transactionFormData.get('transactionType');
//     let transactionDescription = transactionFormData.get('transactionDescription');
//     let transactionAmount = transactionFormData.get('transactionAmount');
//     let transactionCategory = transactionFormData.get('transactionCategory');

//     return {
//         'transactionType': transactionType,
//         'transactionDescription': transactionDescription,
//         'transactionAmount': transactionAmount,
//         'transactionCategory': transactionCategory
//     }
// }

function insertRowinTable(transaction, newTransactionRow){
    let newTransactionCell = newTransactionRow.insertCell(-1);
    newTransactionCell.textContent = transaction;
}

//METHOD TO ADD ROWS AND COLUMNS WITH THE DOM

    // let row = document.createElement('tr'); //Creating a row
    // let dataColumn1 = document.createElement('td'); //Creating a data column
    // let data1 = document.createTextNode(transactionFormData.get('transactionType'));
    // let dataColumn2 = document.createElement('td'); //Creating a data column
    // let data2 = document.createTextNode(transactionFormData.get('transactionDescription'));
    // let dataColumn3 = document.createElement('td'); //Creating a data column
    // let data3 = document.createTextNode(transactionFormData.get('transactionAmount'));
    // let dataColumn4 = document.createElement('td'); //Creating a data column
    // let data4 = document.createTextNode(transactionFormData.get('transactionCategory'));

    // row.appendChild(dataColumn1);
    // row.appendChild(dataColumn2);
    // row.appendChild(dataColumn3);
    // row.appendChild(dataColumn4);
    // dataColumn1.appendChild(data1);
    // dataColumn2.appendChild(data2);
    // dataColumn3.appendChild(data3);
    // dataColumn4.appendChild(data4);

    // transactionTable.appendChild(row);