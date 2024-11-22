const express = require('express');

//* CONSTANTS
const PORT = 3000;
const app = express();


//* ROUTES
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/add/:numA/:numB', function (req, res) {
  const numA = parseInt(req.params.numA);
  const numB = parseInt(req.params.numB);
  const sum = numA + numB;
  res.send(`The sum of ${numA} and ${numB} is ${sum}`);
});

app.get('/subtract/:numA/:numB', function (req, res) {
  const numA = parseInt(req.params.numA);
  const numB = parseInt(req.params.numB);
  const difference = numA - numB;
  res.send(`The difference of ${numA} and ${numB} is ${difference}`);
});

app.get('/multiply/:numA/:numB', function (req, res) {
  const numA = parseInt(req.params.numA);
  const numB = parseInt(req.params.numB);
  const product = numA * numB;
  res.send(`The product of ${numA} and ${numB} is ${product}`);
});

app.get('/divide/:numA/:numB', function (req, res) {
  const numA = parseInt(req.params.numA);
  const numB = parseInt(req.params.numB);
  const quotient = numA / numB;
  res.send(`The quotient of ${numA} and ${numB} is ${quotient}`);
});

app.get('/add', function (req, res) {
  res.send(`Please provide two numbers to add in the URL. For example, /add/5/3`);
});

app.get('/subtract', function (req, res) {
  res.send(`Please provide two numbers to subtract in the URL. For example, /subtract/5/3`);
});

app.get('/multiply', function (req, res) {
  res.send(`Please provide two numbers to multiply in the URL. For example, /multiply/5/3`);
});

app.get('/divide', function (req, res) {
  res.send(`Please provide two numbers to divide in the URL. For example, /divide/5/3`);
});


//* START SERVER ON PORT 3000
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});