'use strict';

const funds = document.querySelector('.available-money');
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteBtn = document.querySelector('.delete');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

const transactionContainerIncome = document.querySelector(
	'.transactionsContainerIncome'
);
const transactionContainerExpenses = document.querySelector(
	'.transactionsContainerExpenses'
);

const addTransactionPanel = document.querySelector('.add-transaction-panel');

const incomeSection = document.querySelector('.income-area');
const expenseSection = document.querySelector('.expenses-area');

const newTransactionName = document.querySelector('#name');
const newTransactionAmount = document.querySelector('#amount');
const newTransactionCategory = document.querySelector('#category');

const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;

let moneyArr = [0];

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};

const hidePanel = () => {
	addTransactionPanel.style.display = 'none';
	clearInputs();
};

const checkForm = () => {
	if (
		newTransactionName.value !== '' &&
		newTransactionAmount.value !== '' &&
		newTransactionCategory.value !== 'none'
	) {
		createNewTransaction();
	} else {
		alert('Fill in all fields!');
	}
};

const clearInputs = () => {
	newTransactionName.value = '';
	newTransactionAmount.value = '';
	newTransactionCategory.selectedIndex = 0;
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	const newValue = parseFloat(newTransactionAmount.value).toFixed(2);

	selectCategory();

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `<p class="transaction-name">${categoryIcon} ${newTransactionName.value}</p>
    <p class="transaction-amount">${newValue}zł <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>`;

	newTransactionAmount.value > 0
		? transactionContainerIncome.appendChild(
				incomeSection.appendChild(newTransaction)
		  ) && newTransaction.classList.add('income')
		: transactionContainerExpenses.appendChild(
				expenseSection.appendChild(newTransaction)
		  ) && newTransaction.classList.add('expense');

	moneyArr.push(parseFloat(newTransactionAmount.value));
	countMoney(moneyArr);

	hidePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory =
		newTransactionCategory.options[newTransactionCategory.selectedIndex].text;
};

const checkCategory = (transaction) => {
	switch (transaction) {
		case '[+] Income':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[-] Shopping':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case '[-] Free time':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
		case '[-] Food':
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case '[-] Bills':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		default:
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
	}
};

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b).toFixed(2);
	funds.textContent = `${newMoney}zł`;

	if (newMoney > 0) {
		funds.style.color = 'rgb(37, 167, 102)';
	} else if (newMoney < 0) {
		funds.style.color = 'rgb(190, 56, 46)';
	} else {
		funds.style.color = 'var(--mainTextDark)';
	}
};

const deleteTransaction = (ID) => {
	const transactionToDelete = document.getElementById(ID);
	console.log(transactionToDelete.childNodes);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[1].textContent
	);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);

	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.classList.contains('income')
		? transactionContainerIncome.removeChild(transactionToDelete)
		: transactionContainerExpenses.removeChild(transactionToDelete);

	countMoney(moneyArr);
};

const deleteAllTransactions = () => {
	transactionContainerIncome.innerHTML = '';
	transactionContainerExpenses.innerHTML = '';
	funds.textContent = '0.00zł';
	moneyArr = [0];
};

const changeStyleToDark = () => {
	root.style.setProperty('--mainTextDark', '#c4c9d8');
	root.style.setProperty(
		'--backgroundLight',
		'linear-gradient(70deg, #0f1221, #0f1225 60%)'
	);
	root.style.setProperty('--borderDark', 'rgb(196, 201, 216, 0.4)');
};

const changeStyleToLight = () => {
	root.style.setProperty('--mainTextDark', '#0f1225');
	root.style.setProperty(
		'--backgroundLight',
		'linear-gradient(70deg, rgb(217, 219, 227), #d2d5dd)'
	);
	root.style.setProperty('--borderDark', 'rgba(0, 0, 0, 0.3)');
};
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

addTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
darkBtn.addEventListener('click', changeStyleToDark);
lightBtn.addEventListener('click', changeStyleToLight);
