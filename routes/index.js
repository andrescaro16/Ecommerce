const router = require('express').Router()

var clientes = require('./clientes');
var ordenes = require('./ordenes');
var logistica = require('./logistica');
var busqueda = require('./busqueda');

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);
router.use('/logistica', logistica);
router.use('/busqueda', busqueda);

module.exports = router;
