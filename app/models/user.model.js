const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
   
    Nombre: String,
    Apellidos: String,
    Correo:String,
    Pasword: String,
    NumeroTelefonico:String,
    Imagen:String,

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
