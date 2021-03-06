const express = require('express')
const cors = require('cors')

// calling body-parser to handle the Request Object from POST requests
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

const port = 3000

const transactions = [{"transactionType":"Income","transactionDescription":"Sitio Web","transactionAmount":"200","transactionCategory":"Business","transactionId":0},{"transactionType":"Expense","transactionDescription":"Pollo","transactionAmount":"8","transactionCategory":"Food","transactionId":2},{"transactionType":"Income","transactionDescription":"Trabajo","transactionAmount":"3000","transactionCategory":"Business","transactionId":3},{"transactionType":"Expense","transactionDescription":"Rent","transactionAmount":"500","transactionCategory":"Home","transactionId":4},{"transactionType":"Expense","transactionDescription":"Big Mac","transactionAmount":"10","transactionCategory":"Food","transactionId":5}]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/transactions', (req, res) => {
  res.send(transactions)
})

// app.use(express.json());
// app.use(express.urlencoded());

// parse application/json
app.use(bodyParser.json())

app.post('/transactions', (req, res) => {
  console.log(req.body);
  res.send('All ok');
})

app.get('/transactions/:id', (req, res) => {
  const transactionId = req.params.id
  const selectedTransaction = transactions.filter(transaction => transaction.transactionId == transactionId)
  res.send(selectedTransaction)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})