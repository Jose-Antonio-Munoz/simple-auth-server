const express=require('express');
const router=express.Router();
const userController=require('../controllers/usuarios.controller');
const auth=require('../../auth');

{/*
probando el servidor con operaciones CRUD 
router.get('/users',userController.getAllUsers);
router.get('/users/:usuario',userController.getOneUserByUsuario);
router.post('/users',userController.createUser);
router.post('/users/login',userController.loginUser);
router.delete('/users/delete',userController.deleteUser);
*/}

router.post('/signin',userController.createUser) //
router.get('/users', auth.userAuth, userController.getAllUsers)
router.post('/login',userController.loginUser)

module.exports=router
