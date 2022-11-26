const router = require('express').Router()

const productoModel = require('../models/ecommerce');



//  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 


//http://localhost:3000/ecommerce/busqueda/categoria/<nombre>
router.get('/categoria/:nombre', function (req, res, next) {
    productoModel
        .categoria(req.params.nombre)
        .then(products_data => {
            if (products_data)
                return res.status(200).send(products_data);
            else 
                return res.status(200).send("Error querying - categoria");
        })
        .catch(err => {
            return res.status(500).send("DB Error - categoria");
        });
});

//http://localhost:3000/ecommerce/busqueda/precio
router.get('/precio', function (req, res, next) {
    let precio_uno = req.body.precio_uno;
    let precio_dos = req.body.precio_dos;
    productoModel
        .precio(precio_uno, precio_dos)
        .then(products_data => {
            if (products_data)
                return res.status(200).send(products_data);
            else 
                return res.status(200).send("Error querying - precio");
        })
        .catch(err => {
            return res.status(500).send("DB Error - precio");
        });
});


module.exports = router;