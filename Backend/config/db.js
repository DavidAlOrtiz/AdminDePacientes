import mongoose  from "mongoose";

const conectarDb = async ()=>{
    try{

     const db = await mongoose.connect(process.env.MONGO_URI ,{
         useNewUrlParser:true,
         useUnifiedTopology:true
     })       
    const url = `${db.connection.host}:${db.connection.port}` 
    console.log(url);
    }catch(error){
        process.exit(1)
    }
}

export default conectarDb;