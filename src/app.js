import express from 'express';
import ProductManager from './productManager.js';

const productManager = new ProductManager('./products.json');

const app = express();

const PORT = 8080;

const products = await productManager.getProducts();

app.get('/', (req,res) => {
    return res.send('Servidor express 🔥🔥🔥');
});

app.get('/products', async (req,res) => {
    const { limit } = req.query;
    if(!limit) {
        return res.send({items: products}); //si no se indica el límite de productos, se devuelven todos
    } else {
        const productsLimit = products.slice(0,limit); //el slice selecciona los primeros objetos del array, hasta el limit. Si el limit es mayor a la cantidad de objetos, toma a todos.
        return res.send({items: productsLimit}); //se devuelven la cantidad de productos que se indican en la query con la clave limit
    };
});

app.get('/products/:pid', async (req,res) => {
    const { pid } = req.params;
    const productFind = await productManager.getProductById(parseInt(pid));
    if(productFind) {
        return res.send({item: productFind}); //si se encuentra el producto con el parámetro enviado (id) se devuelve un objeto con el producto encontrado
    } else {
        return res.send({msg: `Error, product ID (${pid}) does not exist!`}); //si no se encuentra, se devuelve un objeto con un mensaje de error
    };
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT} 🚀🚀🚀🚀`);
});
