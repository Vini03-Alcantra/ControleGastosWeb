const transactionsUl = document.querySelector("#transactions")

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

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDOM)
}

init()