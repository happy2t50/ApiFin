// routes/cotizar.routes.js
const express = require('express');
const router = express.Router();
const cotizarController = require('../controllers/Cotizar.controller');

router.post('/cotizar', cotizarController.createCotizar);
router.get('/cotizar/:id', cotizarController.getCotizarById);
router.put('/cotizar/:modeloDispositivo/:modeloProcesador', cotizarController.updateCotizar);

router.delete('/cotizar/:id', cotizarController.deleteCotizar);

router.get('/cotizar', cotizarController.getAllCotizar);
module.exports = router;