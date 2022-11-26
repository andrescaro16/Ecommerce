const router = require('express').Router()

const ecommerce = require('../models/ecommerce');
const productoModel = require("../models/ecommerce");


//  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 

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

router.get('/productos_en_carrito/:id_orden', function (req, res, next) {
    productoModel
        .productos_en_carrito(req.params.id_orden)
        .then(data_products => {
            if (data_products)
                return res.status(200).send(data_products);
            else 
                return res.status(200).send("Error querying - productos_en_carrito");
        })
        .catch(err => {
            return res.status(500).send("DB Error - productos_en_carrito");
        });

});


//  - - - - - - - - - - - - - - - - - - - OPERACIONES 1.3 - - - - - - - - - - - - - - - - - - -

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

router.get('/crear_carrito_uno/:id_cliente', function (req, res, next) {
    productoModel
        .crear_carrito_uno(req.params.id_cliente)
        .then(order => {
            if (order)
                return res.status(200).send("Ya tienes un " + order[0].estado);
            else 
                return res.status(200).send("Error de validación - crear_carrito_uno");
        })
        .catch(err => {
            return res.status(500).send("Puedes crear tu carrito");
        });
});

router.post('/crear_carrito_dos/:id_cliente', function (req, res, next) {
    productoModel
        .crear_carrito_dos(req.params.id_cliente)
        .then(id_order => {
            if (id_order)
                return res.status(200).send("Carrito creado exitosamente");
            else 
                return res.status(200).send("Error creando carrito - crear_carrito");
        })
        .catch(err => {
            return res.status(500).send("DB Error - crear_carrito");
        });
});

router.post('/agregar_producto_carrito/', function (req, res, next) {
    let cantidad = req.body.cantidad;
    let id_producto = req.body.id_producto;
    let id_orden = req.body.id_orden;

    productoModel
        .agregar_producto_carrito(cantidad, id_producto, id_orden)
        .then(results => {
            if (results)
                return res.status(200).send("Producto agregado al carrito");
            else 
                return res.status(200).send("Error añadiendo al carrito - agregar_producto_carrito");
        })
        .catch(err => {
            return res.status(500).send("DB Error - agregar_producto_carrito");
        });
});

router.put('/modificar_cantidad_producto/', function (req, res, next) {
    let cantidad = req.body.cantidad;
    let id_producto = req.body.id_producto;
    let id_orden = req.body.id_orden;

    productoModel
        .modificar_cantidad_producto(cantidad, id_producto, id_orden)
        .then(results => {
            if (results)
                return res.status(200).send("Cantidad modificada exitosamente");
            else 
                return res.status(200).send("Error modificando la cantidad del producto - modificar_cantidad_producto");
        })
        .catch(err => {
            return res.status(500).send("DB Error - modificar_cantidad_producto");
        });
});

router.delete('/borrar_producto_carrito/:id_producto/:id_orden', function (req, res, next) {
    productoModel
        .borrar_producto_carrito(req.params.id_producto, req.params.id_orden)
        .then(results => {
            if (results)
                return res.status(200).send("Producto eliminado");
            else 
                return res.status(200).send("Error eliminando el producto del carrito - borrar_producto_carrito");
        })
        .catch(err => {
            return res.status(500).send("DB Error - borrar_producto_carrito");
        });
});

router.get('/compra_uno/:id_orden', function (req, res, next) {
    productoModel
        .compra_uno(req.params.id_orden)
        .then(total => {
            if (total)
                return res.status(200).send("El total de tu factura es: " + total[0].total + " COP");
            else 
                return res.status(200).send("Error obteniendo el total - compra_uno");
        })
        .catch(err => {
            return res.status(500).send("DB Error - compra_uno");
        });
});

router.put('/compra_dos', function (req, res, next) {
    let total = req.body.total;
    let direccion_entrega = req.body.direccion_entrega;
    let id_orden = req.body.id_orden;

    productoModel
        .compra_dos(total, direccion_entrega, id_orden)
        .then(result => {
            if (result)
                return res.status(200).send("- - - - - Comprobante - - - - -\nTu pedido con id " + id_orden + " se\nencuentra en proceso de envio");
            else 
                return res.status(200).send("Error en la transacción - compra_dos");
        })
        .catch(err => {
            return res.status(500).send("DB Error - compra_dos");
        });
});

router.put('/compra_tres/:id_orden', function (req, res, next) {
    productoModel
        .compra_tres(req.params.id_orden)
        .then(result => {
            if (result)
                return res.status(200).send("Tu pedido con id " + req.params.id_orden + " ha sido entregado.\n¡Gracias por comprar con nosotros!");
            else 
                return res.status(200).send("Error actualización de entrega - compra_tres");
        })
        .catch(err => {
            return res.status(500).send("DB Error - compra_tres");
        });
});


module.exports = router;