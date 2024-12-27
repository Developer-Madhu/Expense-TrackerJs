document.addEventListener('DOMContentLoaded', () => {
    var formData = document.getElementById('expense-form')
    var inputExpense = document.getElementById('expense')
    var inputAmount = document.getElementById('amount')
    var addbtn = document.getElementById('addbtn')
    var ulItems = document.getElementById('list-items')
    var totalamt = document.getElementById('totalamt')

    let expenses = JSON.parse(localStorage.getItem("exps")) || []
    let totalAmount = calculateTotal();

    renderExpenses()

    formData.addEventListener('submit', (e) => {
        e.preventDefault()
        const expenseName = inputExpense.value.trim();
        const amountNum = parseFloat(inputAmount.value.trim());

        if (expenseName != "" && !isNaN(amountNum) && amountNum > 0) {
            const ExpenseDets = {
                id: Date.now(),
                expenseName,
                amountNum
            }
            expenses.push(ExpenseDets)
            PushIntoLocalStorage()
            renderExpenses()
            updateTotal()
            inputAmount.value = ""
            inputExpense.value = ""
        }
    })

    function PushIntoLocalStorage() {
        localStorage.setItem('exps', JSON.stringify(expenses))
    }

    function calculateTotal() {
        return expenses.reduce((acc, currentVal) => acc + currentVal.amountNum, 0)
    }

    function renderExpenses() {
        expenses.forEach(exp => {
            const li = document.createElement('li')
            li.innerHTML = `${exp.expenseName} - ${exp.amountNum} <button data-id=${exp.id}>Del</button>`
            ulItems.appendChild(li)
        })
    }

    function updateTotal() {
        totalAmount = calculateTotal()
        totalamt.textContent = totalAmount.toFixed(2)
    }
    updateTotal()

    ulItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const expid = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter((exp) => exp.id !== expid)
            PushIntoLocalStorage()
            renderExpenses()
            updateTotal()
        }
    })
})