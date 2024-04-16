const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    Pasword: bcrypt.hashSync(req.body.Pasword, 8),
    Nombre: req.body.Nombre,
    Apellidos: req.body.Apellidos,
    Correo: req.body.Correo,
    NumeroTelefonico: req.body.NumeroTelefonico,
    Imagen: req.body.Imagen
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    // Verifica si el correo es el del administrador
    if (req.body.Correo === 'admin@gmail.com') {
      Role.findOne({ name: 'admin' }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        if (!role) {
          return res.status(500).send({ message: "Admin role not found." });
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // Si no es administrador, asigna el rol de usuario normal
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                return res.status(500).send({ message: err });
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          if (!role) {
            return res.status(500).send({ message: "User role not found." });
          }

          user.roles = [role._id];
          user.save(err => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    Correo: req.body.Correo
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const PasswordIsValid = bcrypt.compareSync(req.body.Pasword, user.Pasword);

      if (!PasswordIsValid) {
        return res.status(401).send({ accessToken: null, message: "Invalid Pasword!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, { algorithm: 'HS256', expiresIn: 180 });

      const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

      res.status(200).send({
        id: user._id,
        Nombre: user.Nombre,
        Apellidos: user.Apellidos,
        Correo: user.Correo,
        NumeroTelefonico: user.NumeroTelefonico,
        Imagen: user.Imagen,
        roles: authorities,
        accessToken: token
      });
    });
};