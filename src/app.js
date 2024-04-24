import express from 'express';
import { productManager} from './ProductManager.js';

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

app.get('/products/:id', async (req,res) => {
    const { id } = req.params;
    const productFind = products.find(prod => prod.id === parseInt(id));
    if(productFind) {
        return res.send({item: productFind});
    } else {
        return res.send({msg: `Error, ID product '${id}' does not exist!`});
    };
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT} 🚀🚀🚀🚀`);
});
