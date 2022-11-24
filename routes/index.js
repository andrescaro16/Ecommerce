const router = require('express').Router()

var clientes = require('./clientes');
var ordenes = require('./ordenes');

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);

module.exports = router;
