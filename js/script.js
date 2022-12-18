'use strict';

const funds = document.querySelector('.available-money');
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteBtn = document.querySelector('.delete');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

const transactionContainer = document.querySelector('.transactionsContainer');

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
		newTransactionAmount.value !== 'none'
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

	selectCategory();

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `<p class="transaction-name">${categoryIcon} ${newTransactionName.value}</p>
    <p class="transaction-amount">${newTransactionAmount.value}zł <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>`;

	//trzeba odroznic kontener wydatkow od konteneru dochodow!!!!
    //i ogarnać dodane transakcje, bo sie rozjezdzaja
	newTransactionAmount.value > 0
		? transactionContainer.appendChild(
				incomeSection.appendChild(newTransaction)
		  ) && newTransaction.classList.add('income')
		: transactionContainer.appendChild(
				expenseSection.appendChild(newTransaction)
		  ) && newTransaction.classList.add('expense');

	moneyArr.push(parseFloat(newTransactionAmount.value));

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
	}
};

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

addTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
saveBtn.addEventListener('click', checkForm);
