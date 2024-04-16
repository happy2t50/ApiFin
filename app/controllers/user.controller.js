const User = require('../models/user.model');

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.getUserDetails = (req, res) => {
  User.findById(req.userId)
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).json({
        Nombre: user.Nombre,
        Apellidos: user.Apellidos,
        Correo: user.Correo,
        NumeroTelefonico: user.NumeroTelefonico,
        Password: user.Password
      });
    });
};
