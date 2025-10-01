const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, expenseController.createExpense);
router.get('/', authMiddleware, expenseController.getUserExpenses);
router.put('/:id', authMiddleware, expenseController.updateExpense);
router.delete('/:id', authMiddleware, expenseController.deleteExpense)

module.exports = router;