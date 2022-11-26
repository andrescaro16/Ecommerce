const router = require('express').Router()

const productoModel = require("../models/ecommerce");



//  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 


//http://localhost:3000/ecommerce/clientes/dinero_total/<id_cliente>
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

//http://localhost:3000/ecommerce/clientes/mayor_compra
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


//http://localhost:3000/ecommerce/clientes/registro
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
                return res.status(200).send(nombre + ", te has registrado correctamente");
            else 
                return res.status(200).send("Customer register error");
        })
        .catch(err => {
            return res.status(500).send("DB error - registro_cliente");
        });
});



//  - - - - - - - - - - - - - - - - - - - OPERACIONES 1.3 - - - - - - - - - - - - - - - - - - - 


//http://localhost:3000/ecommerce/clientes/login?email=<email>&password=<password>
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

//http://localhost:3000/ecommerce/clientes/logout/<id_cliente>
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

//http://localhost:3000/ecommerce/clientes/cerrar_cuenta/<id_cliente>
router.put('/cerrar_cuenta/:id_cliente', function (req, res, next) {
    productoModel
        .cerrar_cuenta(req.params.id_cliente)
        .then(result => {
            if (result)
                return res.status(200).send("Cuenta cerrada exitosamente");
            else 
                return res.status(200).send("Error cerrando cuenta - cerrar_cuenta");
        })
        .catch(err => {
            return res.status(500).send("DB Error - cerrar_cuenta");
        });
});

//http://localhost:3000/ecommerce/clientes/historial/<id_cliente>
router.get('/historial/:id_cliente', function (req, res, next) {
    productoModel
        .historial(req.params.id_cliente)
        .then(historial => {
            if (historial)
                return res.status(200).send(historial);
            else 
                return res.status(200).send("Error recuperando historial - historial");
        })
        .catch(err => {
            return res.status(500).send("DB Error - historial");
        });
});


module.exports = router;
