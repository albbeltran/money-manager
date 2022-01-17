const form = document.getElementById('transactionForm');

// localStorage.removeItem('transactionData');

let transactionObjArray = JSON.parse(localStorage.getItem('transactionData'));

document.addEventListener('DOMContentLoaded',function(){
    drawOptionCategory();

    transactionObjArray.forEach(function(element){
        insertNewRowTable(element);
    });
});

function getTransactionsFromApi(){
    const allTransactions = fetch('http://localhost:3000/transactions');
    console.log(allTransactions);
}

form.addEventListener('submit',function(e){
    e.preventDefault();

    let transactionFormData = new FormData(form);

    if(!(validInput(transactionFormData)==false)){
        let transactionObj = convertFormDataToTransactionObj(transactionFormData);

        saveTransactionObj(transactionObj);
        insertNewRowTable(transactionObj);
    
        form.reset();
    }
});

function insertNewRowTable(transactionObj){
    let transactionTable = document.getElementById('transactionTable');
    let newTransactionRow = transactionTable.insertRow(-1);

    newTransactionRow.setAttribute('data-transaction-id',transactionObj["transactionId"]);

    insertCellTable(newTransactionRow,transactionObj["transactionType"]);
    insertCellTable(newTransactionRow,transactionObj["transactionDescription"]);
    insertCellTable(newTransactionRow,transactionObj["transactionAmount"]);
    insertCellTable(newTransactionRow,transactionObj["transactionCategory"]);

    let removeCell = newTransactionRow.insertCell(4);
    let btnRemove = document.createElement('button');
    let removeContent = document.createTextNode('Delete');

    btnRemove.appendChild(removeContent);
    btnRemove.setAttribute('class','btn-remove');
    removeCell.appendChild(btnRemove);

    btnRemove.addEventListener('click',function(event){
        let transactionRow = event.target.parentNode.parentNode;
        let transactionId = transactionRow.getAttribute('data-transaction-id')
        event.target.parentNode.parentNode.remove();
        removeTransactionObj(transactionId);
    });
}

function insertCellTable(newTransactionRow,transaction){
    let newTransactionCell = newTransactionRow.insertCell(-1);
    newTransactionCell.textContent = transaction;
}

function convertFormDataToTransactionObj(transactionFormData){
    let transactionType = transactionFormData.get('transactionType');
    let transactionDescription = transactionFormData.get('transactionDescription');
    let transactionAmount = transactionFormData.get('transactionAmount');
    let transactionCategory = transactionFormData.get('transactionCategory');
    let transactionId = getTransactionId();

    return {
        'transactionType': transactionType,
        'transactionDescription': transactionDescription,
        'transactionAmount': transactionAmount,
        'transactionCategory': transactionCategory,
        'transactionId' : transactionId
    }
}

function getTransactionId(){
    let lastTransactionId = localStorage.getItem('lastTransactionId') || '-1';
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem('lastTransactionId',JSON.stringify(newTransactionId));
    return newTransactionId;
}

function drawOptionCategory(){
    let elementCategory = ["Food", "Home", "Comunication", "Business", "General"]
    
    elementCategory.forEach(function(element){
        insertOptionCategory(element);
    })
}

function insertOptionCategory(category){
    let selectElement = document.getElementById('transactionCategory');
    let insertHTML = '<option>' + category + '</option>';
    selectElement.insertAdjacentHTML('beforeend',insertHTML);
}

function removeTransactionObj(transactionId){
    containerError.innerHTML = '';

    //I search the index of the transaction to remove
    let transactionIndexArr = transactionObjArray.findIndex(element => element.transactionId == transactionId);
    //I remove the transaction
    transactionObjArray.splice(transactionIndexArr,1);
    let JSONtransactionArray = JSON.stringify(transactionObjArray);
    localStorage.setItem('transactionData',JSONtransactionArray);
}

function saveTransactionObj(transactionObj){
    //Getting the array from the local storage
    let transactionArray = JSON.parse(localStorage.getItem('transactionData')) || [];
    transactionArray.push(transactionObj);
    //Converting the transaction array to JSON
    let JSONtransactionArray = JSON.stringify(transactionArray);
    //Saving the transaction array JSON in the local storage
    localStorage.setItem('transactionData',JSONtransactionArray);
}

function validInput(transactionFormData){
    if((transactionFormData.get('transactionType')==null)||(transactionFormData.get('transactionDescription')=='')||(transactionFormData.get('transactionAmount')=='')){
        let containerError = document.getElementById('containerError');
        containerError.innerHTML = '';
    
        let error = document.createElement('div');
        error.setAttribute('class','error');
        let errorContent = document.createTextNode('Please fill in all the fields');
        error.appendChild(errorContent);
        containerError.appendChild(error);

        return false
    }

    containerError.innerHTML = '';
}

console.log(fetch('http://localhost:3000/transactions'));

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