const router = require('express').Router()

const productoModel = require("../models/ecommerce");

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


module.exports = router;