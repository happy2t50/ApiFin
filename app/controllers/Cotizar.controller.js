const Cotizar = require("../models/Cotizar.model");

exports.createCotizar = async (req, res) => {
    try {
      const cotizar = new Cotizar(req.body);
      const savedCotizar = await cotizar.save();
      res.status(201).json(savedCotizar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
exports.getCotizarById = async (req, res) => {
    try {
      const cotizar = await Cotizar.findById(req.params.id);
      if (!cotizar) {
        return res.status(404).json({ message: 'Dispositivo no encontrado' });
      }
      res.status(200).json(cotizar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 
  
exports.deleteCotizar = async (req, res) => {
    try {
      const cotizar = await Cotizar.findByIdAndDelete(req.params.id);
      if (!cotizar) {
        return res.status(404).json({ message: 'Dispositivo no encontrado' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateCotizar = async (req, res) => {
    try {
        
        const { ModeloDispositivo, ModeloProcesador } = req.body;

       
        const cotizar = await Cotizar.findOneAndUpdate(
            { ModeloDispositivo, ModeloProcesador },
            req.body, 
            { new: true }
        );

        if (!cotizar) {
            return res.status(404).json({ message: 'Cotizar no encontrada' });
        }

        res.status(200).json(cotizar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  exports.getAllCotizar = async (req, res) => {
    try {
        const cotizar = await Cotizar.find();
        res.status(200).json(cotizar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};