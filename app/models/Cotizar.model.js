const mongoose = require('mongoose');

const cotizarSchema = new mongoose.Schema({
  ModeloDispositivo: { type: String, required: true },
  ModeloProcesador: { type: String, required: true },
  MemoriaRam_Rom: { type: String, required: true },
  DimensionPantalla: { type: String, required: true },
  Color: { type: String, required: true },
  Camara: { type: String, required: true },
  Descripcion: { type: String, required: true },
  FotoDispositivo: { type: String, required: true }
});

module.exports = mongoose.model('Cotizar', cotizarSchema);