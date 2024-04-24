import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8"); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
        return JSON.parse(products);
      } else {
        return []; //si no existe el archivos products.json devuelve un array vacío.
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(objProd) {
    try {
      const products = await this.getProducts(); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
      const product = { id: this.#getNextID(products), ...objProd }; //agrega el campo id (autoincrementable) al objeto producto
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products)); //graba el array products en formato JSON en el archivos products.json
      return console.log(
        `Product with ID ${product.id} was created successfully.`
      );
    } catch (error) {
      console.log(error);
    }
  }

  #getNextID(products) {
    let nextID = 0;
    products.map((product) => {
      if (product.id > nextID) nextID = product.id;
    });
    return nextID + 1;
  }

  async updateProduct(objProduct) {
    try {
      const products = await this.getProducts();
      const updateProd = products.map((product) => {
        if (product.id === objProduct.id) {
          return objProduct;
        } else {
          return product;
        }
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updateProd));
      console.log(`Product with ID ${objProduct.id} was updated.`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      console.log(`Product with ID Nº ${id} was deleted.`);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    console.log(`Find Product by ID Nº ${id}`);
    const products = await this.getProducts(); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
    const product = await products.find((prod) => prod.id === id);
    if (!product) return console.log(`Product with ID ${id} does not exist.`);
    return product;
  }
}

export const productManager = new ProductManager('./products.json');
