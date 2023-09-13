const Usuarios=require('../models/usuarios.model.js')
require('dotenv').config()
const jwt=require('jsonwebtoken')

const jwtSecret=process.env.JWTSECRET;

exports.createUser=async(req,res)=>{
    try{
        let newUser =new Usuarios({
            usuario:req.body.usuario,
            password:req.body.password
        })
        await newUser.save();
        res.json(newUser);
    }catch(err){
        res.status(400).json({
            status:'error',
            message:err.message,
        });            
    }    
}

exports.getAllUsers= async (req,res)=>{
    try{
        const users = await Usuarios.find({},"usuario password")
        res.json(users)
    }catch{
        res.status(500).json({ error: 'Error al obtener usuarios de la base de datos' });
    }
}

exports.getOneUserByUsuario=async(req,res)=>{
    const userUsuario =req.params.usuario
    try{
        const user=await Usuarios.findOne({usuario:userUsuario}, 'usuario password')
        if (!user){
            return res.status(404).json({mesagge:"usuario no encontrado"});

        }
        res.json(user)
    }catch{
        res.status(500).json({message:error.mesagge})
    }
}

exports.loginUser=async (req,res)=>{
    
    try{
        let {usuario,password}=req.body
        const user = await Usuarios.findOne({usuario,password})
        if(!user){
            res.status(401).json({message:"Inicio de sesión no exitoso", err:"usuario no encontrado"});
        }else{
            const maxAge = 3 * 60 * 60; // tiempo en segundos
            const token=jwt.sign({id:user._id,usuario},jwtSecret,{ expiresIn: maxAge,})
            res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000}) //tiempo en milisegundos
            res.status(200).json({message:"Inicio de sesión exitoso", user});
        }

    }catch(err){
        res.status(400).json({message:"un error inesperado ha ocurrido", error: err});
    }
}

exports.deleteUser=async (req,res)=>{
    try{
        userID=req.body.id
        const deletedUser=await Usuarios.findByIdAndRemove(userID);
        if (!deletedUser) {
            res.status(404).json({ message: "Usuario no encontrado" });
          }
          res.json({ message: "Usuario eliminado de forma satisfactoria", user: deletedUser });
    }catch (err) {
          console.log("error de otro tipo")
          res.status(500).json({ message: err.message });
    }
}


