const router = require('express').Router()

const productoModel = require("../models/ecommerce");


//  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 

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


// - - - - - - - - - - - - - - - - - - - CRUD 1.2 - - - - - - - - - - - - - - - - - - -

router.post('/registro', function (req, res, next) {
    let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;

    productoModel
        .registro_cliente(nombre, email, password, direccion, telefono)
        .then(data_register => {
            if (data_register)
                return res.status(200).send(data_register);
            else 
                return res.status(200).send("Customer register error");
        })
        .catch(err => {
            return res.status(500).send("DB error - registro_cliente");
        });
});


//  - - - - - - - - - - - - - - - - - - - OPERACIONES 1.3 - - - - - - - - - - - - - - - - - - - 

router.get('/login', function (req, res, next) {
    productoModel
        .login(req.query['email'], req.query['password'])
        .then(id_cliente => {
            if (id_cliente)
                return res.status(200).send("Inicio de sesión exitoso");
            else 
                return res.status(200).send("Email o password invalidos");
        })
        .catch(err => {
            return res.status(500).send("DB Error - Login");
        });
});

router.get('/logout/:id_cliente', function (req, res, next) {
    productoModel
        .logout(req.params.id_cliente)
        .then(name => {
            if (name)
                return res.status(200).send(name.nombre + ", has cerrado sesión exitosamente");
            else 
                return res.status(200).send("Error cerrando sesión - logout");
        })
        .catch(err => {
            return res.status(500).send("DB Error - Logout");
        });
});


module.exports = router;
