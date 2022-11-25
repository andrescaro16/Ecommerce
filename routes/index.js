const router = require('express').Router()

var clientes = require('./clientes');
var ordenes = require('./ordenes');
var logistica = require('./logistica');

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);
router.use('/logistica', logistica);

module.exports = router;
