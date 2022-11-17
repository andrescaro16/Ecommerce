const express = require('express');
const router = express.Router();

const productoModel = require("../models/ecommerce");

router.get('/login', function (req, res, next) {
    productoModel
        .login(req.query['email'], req.query['password'])
        .then(id_customer => {
            if (id_customer)
                return res.status(200).send(id_customer);
            else 
                return res.status(200).send("Invalid username or password");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});

router.get('/qorder/:id_order', function (req, res, next) {
    productoModel
        .qorder(req.params.id_order)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("id_order no existe");
        })
        .catch(err => {
            return res.status(200).send("DB Error - qorder");
        });

});

router.post('/crear_carrito', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.id_customer;
    const id_customer  = req.body.id_customer;
    productoModel
        .crear_carrito(id_customer)
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
