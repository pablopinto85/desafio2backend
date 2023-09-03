const Module = require('module');

const fs = require('fs').promises;

class ProductManager {
  
  constructor(path) {
    this.path = path;
    this.products = [];
    this.productIdCounter = 1;
    this.loadProducts();

    if (this.products.length === 0) {
      this.addInitialProducts();
    }
  }
  
  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.productIdCounter = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    } catch (error) {
      this.products = [];
      this.productIdCounter = 1;
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  async addProduct(product) {
    const newProduct = { ...product, id: this.productIdCounter++ };
    this.products.push(newProduct);
    await this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(prod => prod.id === id);
    return product || null;
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      await this.saveProducts();
      return true;
    }
    return false;
  }

  async deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(prod => prod.id !== id);
    if (this.products.length !== initialLength) {
      await this.saveProducts();
      return true;
    }
    return false;
  }

  async addInitialProducts() {
    await this.addProduct({
      title: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      thumbnail: "ruta/imagen1.jpg",
      code: "abc121",
      stock: 10
    });

    await this.addProduct({
      title: "Producto 2",
      description: "Descripción del producto 2",
      price: 200,
      thumbnail: "ruta/imagen2.jpg",
      code: "abc122",
      stock: 15
    });
    await this.addProduct({
      title: "Producto 3",
      description: "Descripción del producto 3",
      price: 300,
      thumbnail: "ruta/imagen3.jpg",
      code: "abc123",
      stock: 20
    });
    await this.addProduct({
      title: "Producto 4",
      description: "Descripción del producto 4",
      price: 400,
      thumbnail: "ruta/imagen4.jpg",
      code: "abc124",
      stock: 25
    });
    await this.addProduct({
      title: "Producto 5",
      description: "Descripción del producto 5",
      price: 500,
      thumbnail: "ruta/imagen5.jpg",
      code: "abc125",
      stock: 30
    });
    await this.addProduct({
      title: "Producto 6",
      description: "Descripción del producto 6",
      price: 600,
      thumbnail: "ruta/imagen6.jpg",
      code: "abc126",
      stock: 35
    });
    await this.addProduct({
      title: "Producto 7",
      description: "Descripción del producto 7",
      price: 700,
      thumbnail: "ruta/imagen7.jpg",
      code: "abc127",
      stock: 40
    });
  }
}

(async () => {
  const productManager = new ProductManager('./productos.json');

  console.log("Lista de productos:", await productManager.getProducts());
  console.log("Producto con ID 1:", await productManager.getProductById(1));

  const updateResult = await productManager.updateProduct(1, { price: 180, stock: 18 });
  console.log("Producto actualizado:", updateResult ? "Éxito" : "Fallo");

  const deleteResult = await productManager.deleteProduct(4);
  console.log("Producto eliminado:", deleteResult ? "Éxito" : "Fallo");
})();

module.exports = ProductManager;


