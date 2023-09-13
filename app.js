require('dotenv').config()
const express =require('express');
const bodyParser = require('body-parser');
const userRoutes=require('./src/routes/usuarios.routes');
const connectToDB= require('./db')
const cookieParser = require('cookie-parser');

const app=express();
const port =process.env.port || 3000

connectToDB();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',userRoutes)


app.listen(port,()=>{
    console.log(`el servidor esta escuchando en el puerto ${port}`)
})