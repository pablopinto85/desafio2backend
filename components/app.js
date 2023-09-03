
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

const ProductManager = require('./productmanager');


const productManager = new ProductManager('./productos.json'); 


app.get('/products', (req, res) => {
  const { limit } = req.query;
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
  res.json(products);
});


app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.send({ error: "El Producto solicitado no existe" });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
