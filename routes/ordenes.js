const router = require('express').Router()

const productoModel = require("../models/ecommerce");

router.get('/qorder/:id_orden', function (req, res, next) {
    productoModel
        .qorder(req.params.id_orden)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("id_order no existe - qorder");
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

router.get('/ventas_fecha', function (req, res, next) {
    let fecha_uno = req.body.fecha_uno;
    let fecha_dos = req.body.fecha_dos;
    productoModel
        .ventas_fecha(fecha_uno, fecha_dos)
        .then(data_ventas => {
            if (data_ventas)
                return res.status(200).send(data_ventas);
            else 
                return res.status(200).send("Error querying - ventas_fecha");
        })
        .catch(err => {
            return res.status(500).send("DB Error - ventas_fecha");
        });

});

router.get('/envios', function (req, res, next) {
    productoModel
        .envios()
        .then(data_shippingOrders => {
            if (data_shippingOrders)
                return res.status(200).send(data_shippingOrders);
            else 
                return res.status(200).send("Error querying - ordenes_envio");
        })
        .catch(err => {
            return res.status(500).send("DB Error - ordenes_envio");
        });

});

module.exports = router;