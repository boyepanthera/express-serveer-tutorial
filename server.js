const express = require('express');
const path = require('path');
const server = express();
const port = 4000;

//This allows our server to be able to read raw(json) form content
server.use(express.json());

//this allows our server to read urlencoded forms
server.use(express.urlencoded({ extended: true }));

const products = [
  { id: 1, name: 'garri', quantity: 100, price: 300 },
  { id: 2, name: 'beans', quantity: 300, price: 50 },
  { id: 3, name: 'cassava', quantity: 1000, price: 300 },
  { id: 4, name: 'corn', quantity: 500, price: 20 },
  { id: 5, name: 'agbado', quantity: 80, price: 200 },
];

let users = [
  {
    id: 1,
    email: 'boyepanthera@gmail.com',
    firsName: 'Olanrewaju',
    lastName: 'Olaboye',
    password: '1234567',
  },
  {
    id: 2,
    email: 'jamal@gmail.com',
    firsName: 'Olajide',
    lastName: 'Ibrahim',
    password: '1234567',
  },
  {
    id: 3,
    email: 'dayolonge@gmail.com',
    firsName: 'Oladayo',
    lastName: 'Longe',
    password: '1234567',
  },
];

//creating a controller/handleer for request to the base/index url : localhost:4000
server.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World');
});

server.get('/product', (req, res) => {
  return res.sendFile(path.join(__dirname, '/views/products.html'));
});

server.get('/api/product', (req, res) => {
  return res.send({ products });
});

server.get('/login', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views/login.html'));
});

server.post('/api/login', (req, res) => {
  console.log('form data submitted', req.body);
  const userExist = users.find((user) => user.email === req.body.email);
  if (userExist) {
    if (userExist.password === req.body.password) {
      return res.send({ user: userExist });
    } else {
      return res.status(400).send('incorrect password');
    }
  } else {
    return res.status(404).send("you don't have an account. signup instead");
  }
});

server.listen(port, () =>
  console.log('server started and running on port ' + port)
);
