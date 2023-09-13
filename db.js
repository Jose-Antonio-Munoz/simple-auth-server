const mongoose=require('mongoose')
const dbURI =process.env.MONGODB_URI;

const connectToDB = async()=>{
    await mongoose
    .connect( dbURI, { useNewUrlParser:true,useUnifiedTopology:true } )
    .then(()=>{ console.log('conexion establecida con mongoDB Atlas'); })
    .catch((err)=>{ console.log('error conectando con mongoDB Atlas', err); });
    
}

module.exports= connectToDB;