import  express  from "express";
import conectarDb from './config/db.js'
import dotenv from 'dotenv';
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRouter from './routes/pacienteRouter.js'

const app = express();

import cors from "cors";


const corsOptions ={
   origin:'*',    
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


/*
const dominiosPermitidos = ['http://localhost:3000'];
const corsOptions = {
    origin : function(origin, collback){
        if(dominiosPermitidos.indexOf(origin) !== -1 ){
            collback(null , true)
        }else{
            collback(new Error("No permitido por express"+ origin))
            console.log();
        }
    }
}
*/



//Leer datos del json para
app.use(express.json());



dotenv.config()
conectarDb()
app.use(cors(corsOptions))
app.use('/api/veterinaria', veterinarioRoutes)
app.use('/api/pacientes', pacienteRouter)

const port = process.env.PORT || 4000;

//iniciando el servidor del servidor
app.listen(port,()=>{
    console.log("Servidor funciona el puerto 4000")
});



