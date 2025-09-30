const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const e = require('cors');

router.post('/', expenseController.createExpense);
router.get('/', expenseController.getUserExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense)

module.exports = router;