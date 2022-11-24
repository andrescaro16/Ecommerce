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


module.exports = router;
