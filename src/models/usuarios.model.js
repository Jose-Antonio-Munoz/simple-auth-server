const mongoose =require('mongoose');

const usuarioSchema =new mongoose.Schema({
    usuario :{type:String ,require: true, unique:true},
    password :{type:String, require:true,}
})

const Usuarios= mongoose.model("Usuarios",usuarioSchema);

module.exports = Usuarios