const transactionsUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")

const dummyTransactions = [
    {id: 1, name: "Auxílio Transporte", amount: 80},
    {id: 2, name: "Salário Estágio", amount: 1000},
    {id: 3, name: "Pizza de Calabresa - Pizza Hut", amount: -65},
    {id: 4, name: "Bolo de Limão", amount: -49.00},
]

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-':'+'
    const CSSClass = transaction.amount < 0 ? 'minus':'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement("li")

    li.classList.add(CSSClass)
    li.innerHTML = `        
        ${transaction.name}<span>${operator}R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>        
    `
    transactionsUl.prepend(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount)
    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator+value, 0).toFixed(2)
    const expense = transactionsAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator+value)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ""
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", event => {
    event.preventDefault()
    
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === "") {
        alert("Please, complete name or value of transaction")
        return
    }

    const transaction = {id: generateID(), name: transactionName, amount: Number(transactionAmount)}
    dummyTransactions.push(transaction)
    init()

    inputTransactionName.value = ""
    inputTransactionAmount.value = ""
})