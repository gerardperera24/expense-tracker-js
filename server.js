require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

//Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Expense Tracker API Running!'));

//Starting the server
app.listen(port, () => console.log(`Server running on port ${port}`));