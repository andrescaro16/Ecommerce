const express = require('express');
const router = express.Router();

const productoModel = require("../models/ecommerce");

router.get('/login', function (req, res, next) {
    productoModel
        .login(req.query['email'], req.query['password'])
        .then(id_cliente => {
            if (id_cliente)
                return res.status(200).send(id_cliente);
            else 
                return res.status(200).send("Invalid username or password");
        })
        .catch(err => {
            return res.status(500).send("DB Error - Login");
        });

});

router.get('/qorder/:id_orden', function (req, res, next) {
    productoModel
        .qorder(req.params.id_orden)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("id_order no existe");
        })
        .catch(err => {
            return res.status(500).send("DB Error - qorder");
        });

});

router.post('/crear_carrito', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.id_cliente;
    const id_cliente  = req.body.id_cliente;
    productoModel
        .crear_carrito(id_cliente)
        .then(id_order => {
            if (id_order)
                return res.status(200).send(id_order);
            else 
                return res.status(200).send("hubo algun problema");
        })
        .catch(err => {
            return res.status(500).send("Error creando el carrito");
        });
});

module.exports = router;
