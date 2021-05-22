const transactionsUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
)
let transactions = localStorage
    .getItem("transactions") !== null ? localStorageTransactions : []

const removeTransaction = id => {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ""
    inputTransactionAmount.value = ""
}

const handleFormSubmit = event => {
    event.preventDefault()
    
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === "";
    
    if (isSomeInputEmpty) {
        alert("Please, complete name or value of transaction")
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-':'+'
    const CSSClass = transaction.amount < 0 ? 'minus':'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement("li")

    li.classList.add(CSSClass)
    li.innerHTML = `        
        ${transaction.name}<span>${operator}R$ ${amountWithoutOperator}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>        
    `
    transactionsUl.prepend(li)
}

const getExpenses = transactionsAmounts => Math.abs(  
    transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({amount}) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ""
    console.log(transactions)
    transactions.forEach(addTransactionIntoDOM) 
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", handleFormSubmit)