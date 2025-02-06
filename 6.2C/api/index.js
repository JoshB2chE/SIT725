const express = require('express');
const connectDB = require('./db');

const userRoutes = require('./routes/userRoutes');

const PORT = 3000;
const app = express();

connectDB();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});