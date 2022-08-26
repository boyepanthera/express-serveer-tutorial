const express = require('express');
const path = require('path');
const server = express();
const port = 4000;

//This allows our server to be able to read raw(json) form content
server.use(express.json());

//this allows our server to read urlencoded forms
server.use(express.urlencoded({ extended: true }));

const products = [
  {
    id: 1,
    name: 'garri',
    quantity: 100,
    price: 300,
    imageUrl:
      'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944__480.jpg',
  },
  {
    id: 2,
    name: 'beans',
    quantity: 300,
    price: 50,
    imageUrl:
      'https://cdn.pixabay.com/photo/2022/01/28/09/26/azadi-tower-6974106__480.jpg',
  },
  {
    id: 3,
    name: 'cassava',
    quantity: 1000,
    price: 300,
    imageUrl:
      'https://cdn.pixabay.com/photo/2022/06/29/22/40/vervain-7292657__480.jpg',
  },
  {
    id: 4,
    name: 'corn',
    quantity: 500,
    price: 20,
    imageUrl:
      'https://cdn.pixabay.com/photo/2022/02/18/07/27/lake-7020123__480.jpg',
  },
  {
    id: 5,
    name: 'agbado',
    quantity: 80,
    price: 200,
    imageUrl:
      'https://cdn.pixabay.com/photo/2022/07/26/12/43/mountains-7345777__480.jpg',
  },
];

let users = [
  {
    id: 1,
    email: 'boyepanthera@gmail.com',
    firstName: 'Olanrewaju',
    lastName: 'Olaboye',
    password: '1234567',
  },
  {
    id: 2,
    email: 'jamal@gmail.com',
    firstName: 'Olajide',
    lastName: 'Ibrahim',
    password: '1234567',
  },
  {
    id: 3,
    email: 'dayolonge@gmail.com',
    firstName: 'Oladayo',
    lastName: 'Longe',
    password: '1234567',
  },
];

//creating a controller/handleer for request to the base/index url : localhost:4000
server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/product', (req, res) => {
  return res.sendFile(path.join(__dirname, '/views/products.html'));
});

server.get('/product/:id', (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname, 'views/single-product.html'));
});

server.get('/api/product', (req, res) => {
  return res.send({ products });
});

server.get('/api/product/:id', (req, res) => {
  const productExist = products.find(
    (product) => product.id === Number(req.params.id)
  );
  if (productExist) {
    return res.status(200).send({ product: productExist });
  }
  return res.status(404).send({ message: 'product not found' });
});

server.get('/login', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views/login.html'));
});

server.post('/api/login', (req, res) => {
  console.log(req.body);
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

server.all('*', (req, res) => {
  // res.status(404).send({ message: 'endpoint not found' });
  return res.status(404).sendFile(path.join(__dirname, 'views/not-found.html'));
});

server.listen(port, () =>
  console.log('server started and running on port ' + port)
);
