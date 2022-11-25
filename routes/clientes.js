const router = require('express').Router()

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

router.get('/dinero_total/:id_cliente', function (req, res, next) {
    productoModel
        .dinero_total(req.params.id_cliente)
        .then(data_money => {
            if (data_money)
                return res.status(200).send(data_money);
            else 
                return res.status(200).send("Error querying");
        })
        .catch(err => {
            return res.status(500).send("DB Error - dinero_total");
        });
});

router.get('/mayor_compra', function (req, res, next) {
    productoModel
        .mayor_compra()
        .then(dataMayorCompra => {
            if (dataMayorCompra)
                return res.status(200).send(dataMayorCompra);
            else 
                return res.status(200).send("Error querying");
        })
        .catch(err => {
            return res.status(500).send("DB Error - dinero_total");
        });
});

module.exports = router;
