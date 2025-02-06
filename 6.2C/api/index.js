const express = require('express');
const connectDB = require('./db');

const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');

const PORT = 3000;
const app = express();

connectDB();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.render('users', { users });
  }

  catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;