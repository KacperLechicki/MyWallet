'use strict';

const funds = document.querySelector('.available-money');
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteBtn = document.querySelector('.delete');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

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
