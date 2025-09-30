require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

//Routes
const userRoutes = require('./src/routes/user');
app.use('/api/users', userRoutes);

const expenseRoutes = require('./src/routes/expense');
app.use('/api/expenses', expenseRoutes);


app.get('/', (req, res) => res.send('Expense Tracker API Running!'));

//Starting the server
app.listen(port, () => console.log(`Server running on port ${port}`));