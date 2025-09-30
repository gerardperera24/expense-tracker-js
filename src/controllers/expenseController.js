const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createExpense = async (req, res) => {
  const { description, amount, category, date, userId } = req.body;

  try {
    //Process of creating a new user in the database
    const expense = await prisma.expense.create({
      data: { description, amount: parseFloat(amount), category: category || null, date: date ? new Date(date) : new Date(), userId }
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Could not add the expense' });
  }
};

//Get all expenses for a user
exports.getUserExpenses = async (req, res) => {
  const { userId } = req.query;

  try {
    const expenses = await prisma.expense.findMany({ where: userId ? { userId: parseInt(userId) } : {}, orderBy: { date: 'desc' } });
    res.json({ expenses });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update an expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, category, date } = req.body;

  try {
    const expense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { description, amount: amount ? parseFloat(amount) : undefined, category, date: date ? new Date(date) : undefined, category, date: date ? new Date(date) : undefined }
    });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.expense.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

