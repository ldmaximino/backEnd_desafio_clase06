import fs from 'fs';

export default class ProductManager {
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
      };
    } catch (error) {
      console.log(error);
    };
  };

  async getProductById(id) {
    const products = await this.getProducts(); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
    const product = await products.find((prod) => prod.id === id);
    return product;
  };
};
