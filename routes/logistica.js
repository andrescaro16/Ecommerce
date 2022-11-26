const router = require('express').Router()

const productoModel = require("../models/ecommerce");



//  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 


//http://localhost:3000/ecommerce/logistica/stock/<nombre>
router.get('/stock/:nombre', function (req, res, next) {
    productoModel
        .stock_producto(req.params.nombre)
        .then(data_stock => {
            if (data_stock)
                return res.status(200).send(data_stock);
            else 
                return res.status(200).send("Error querying - stock_producto");
        })
        .catch(err => {
            return res.status(500).send("DB Error - stock_producto");
        });
});

//http://localhost:3000/ecommerce/logistica/producto_mas_costoso
router.get('/producto_mas_costoso', function (req, res, next) {
    productoModel
        .producto_mas_costoso()
        .then(product_data => {
            if (product_data)
                return res.status(200).send(product_data);
            else 
                return res.status(200).send("Error querying - producto_mas_costoso");
        })
        .catch(err => {
            return res.status(500).send("DB Error - producto_mas_costoso");
        });
});

//http://localhost:3000/ecommerce/logistica/producto_mas_barato
router.get('/producto_mas_barato', function (req, res, next) {
    productoModel
        .producto_mas_barato()
        .then(product_data => {
            if (product_data)
                return res.status(200).send(product_data);
            else 
                return res.status(200).send("Error querying - producto_mas_barato");
        })
        .catch(err => {
            return res.status(500).send("DB Error - producto_mas_barato");
        });
});

//http://localhost:3000/ecommerce/logistica/repartidor/<id_orden>
router.get('/repartidor/:id_orden', function (req, res, next) {
    productoModel
        .repartidor(req.params.id_orden)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("Error querying - repartidor");
        })
        .catch(err => {
            return res.status(500).send("DB Error - repartidor");
        });
});


// - - - - - - - - - - - - - - - - - - - CRUD 1.2 - - - - - - - - - - - - - - - - - - -

//http://localhost:3000/ecommerce/logistica/actualizar_stock
router.put('/actualizar_stock', function (req, res, next) {
    let stock = req.body.stock;
    let id_producto = req.body.id_producto;

    productoModel
        .actualizar_stock(stock, id_producto)
        .then(update_results => {
            if (update_results)
                return res.status(200).send(update_results);
            else 
                return res.status(200).send("Error updating - actualizar_stock");
        })
        .catch(err => {
            return res.status(500).send("DB Error - actualizar_stock");
        });
});

//http://localhost:3000/ecommerce/logistica/eliminar_producto
router.delete('/eliminar_producto', function (req, res, next) {
    let id_producto = req.body.id_producto;

    productoModel
        .eliminar_producto(id_producto)
        .then(data_results => {
            if (data_results)
                return res.status(200).send("Producto con id " + id_producto + " eliminado");
            else 
                return res.status(200).send("Error deleting - eliminar_producto");
        })
        .catch(err => {
            return res.status(500).send("DB Error - eliminar_producto\n¡Debes asegurarte de que ningun registro en orden_detalles\ndepende de este producto!");
        });
});


module.exports = router;