class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.showItem(this.budgetFeedback, "Value cannot be empty or negative");
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
        this.budgetInput.value = '';
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
  //show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else if (total === 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showBlack');
    }
  }
  //submit expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    const self = this;
    if (!expenseValue.length || !amountValue.length || amountValue < 0) {
      this.showItem(this.expenseFeedback, "Please fill out the form.");
      setTimeout(()=> {
        self.expenseFeedback.classList.remove('showItem');
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }
  // add expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>

        <div class="expense-icons list-item">

        <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
        </a>
        </div>
      </div>
    `;
      this.expenseList.appendChild(div);
  }
  showItem(itemToShow, message) {
    if (message) {
      itemToShow.innerHTML = `<p>${message}</p>`;
    }
    return itemToShow.classList.add('showItem');
  }
  //total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function(previousValue, currentValue) {
        previousValue += currentValue.amount;
        return previousValue;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }
}

function eventListeners() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  // new instance of UI CLASS
  const ui = new UI();

  // budget form submit 
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitBudgetForm();
  });
  // expense form submit 
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  });
  // expense List click 
  expenseList.addEventListener('click', () => {

  });
}

document.addEventListener('DOMContentLoaded', eventListeners);