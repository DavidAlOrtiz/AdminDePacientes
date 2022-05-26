import Veterinario  from "../models/Veterinario.js";
import generalId from '../helper/generar_id.js';
import generarJWT from "../helper/generalJWT.js";
import { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } from 'mongodb-snapshot';
import  backup  from 'mongodb-backup';
import  exec  from "child_process";
import emailRegistro from  '../helper/emailRegistro.js'
import emailOlvidePassword from '../helper/emailOlviseP.js'


const registrar = async (req, res, next) => {

    const {email, nombre} = req.body;
    //Prevenir usuario duplicados 
    const existeUsuario = await Veterinario.findOne({email})
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }
    try{
        //Guardar un nuevo usuario
        
        const veterinario = new Veterinario(req.body);
        //veterinario.t = "Juan";
        const veterinarioGuardado = await veterinario.save();

        //Enviar al email 
        emailRegistro({
            nombre,
            email,
            t : veterinarioGuardado.t
        });
        res.json(veterinarioGuardado)
        
    }catch(e){
        console.error(e)
    }  

};

const perfil = (req, res, next) => {
    const {veterinario} = req; 
    res.json({veterinario})
};

const confirmar = async (req, res , next) =>{


    const  {t} = req.params;
    const usuarioEncontrado = await Veterinario.findOne( { t } )

    if( !usuarioEncontrado ){
        const error = new Error("Token no valido")
        return res.status(404).json({msg : error.message})
    }

    try{
        usuarioEncontrado.t = null;
        usuarioEncontrado.confirmado = true;
        await usuarioEncontrado.save();
        res.json("Usuario confirmado correctamente")
    }catch(e){
        console.log(e.message)
    }

    
    
}

const autenticar = async (req, res) => {
   const {email, password} = req.body;

   const usuario = await Veterinario.findOne({email})

   if(!usuario ){
        const error = new Error("El usuario no existe ")
        return res.status(404).json({msg : error.message})
    }

   if(!usuario.confirmado){
       const error = new Error("El usuario no esta confirmado");
       return res.status(404).json({msg : error.message})
   }

   //Comprobamos le password del usuario 
   if( await usuario.comprobarPassword(password)){
       //Json wep token
       //usuario.token = generarJWT(usuario.id)
      res.json({
          token: generarJWT(usuario.id)
      })
      console.log(generarJWT(usuario.id))
   }else{
    const error = new Error("El password es incorrecto ");
    return res.status(404).json({msg : error.message})
   }

   
} 

const olvidepasword = async  (req, res, next) => {
    const {email} = req.body;
    const existeVeterinario = await  Veterinario.findOne({email});
    
    if(!existeVeterinario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg : error.message})
    }

    try{
        existeVeterinario.t = generalId();
        await existeVeterinario.save();
        res.json({msg : "hemos enviado un email con tus instrucciones"})
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            t: existeVeterinario.t
        })
    }catch(e){

    }
}

const comprobarToken = async  (req, res, next) => {
    const {t} = req.params;
    const tokenValido = await  Veterinario.findOne( { t } );
    console.log(tokenValido)
    if(tokenValido){
        //El token es valido 
        res.json({msg: "Token valido el usuario existe"})
    }else{
        const erro = new Error("Token no valido");
        return res.status(404).json({msg: erro.message});
    }
}

const nuevoPassword = async (req, res, next) =>{
    const {t} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({t});

    if(!veterinario){
        const error = new Error("Hubo un error");
        return res.status(404).json({msg : error.message})
    }

    try{
        veterinario.t = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg : "Password modificado correctamente"})
    }catch(e){

    }

}


const backn = async (req, res, next) =>{
   
    backup({
        uri: 'mongodb://root:root@cluster0-shard-00-00.mdpb8.mongodb.net:27017,cluster0-shard-00-01.mdpb8.mongodb.net:27017,cluster0-shard-00-02.mdpb8.mongodb.net:27017/apv?ssl=true&replicaSet=atlas-5fq4tc-shard-0&authSource=admin&retryWrites=true&w=majority', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: "C:\\Users\\dortiz\\Desktop\\dump",
        parser: 'bson',
        metadata: true,
        stream: res, 
      });
   
}



const mtOptions = {
    db: 'apv',
    port: 17017,
    path: 'C:\\Users\\dortiz\\Desktop\\BackupsGallardo',
    dropboxToken: process.env.MYAPP_DROPBOX_SECRET_TOKEN
  };


async function back(req, res, next) {
    //backup mongodb database
        
        const cmd = "mongodump  --out \\\\SERVERBACKUP1\\Backups"; // Command for mongodb dump process

        console.log("DB backup started ... ");
        console.log(cmd);
        exec.exec(cmd, function(error, stdout, stderr) {
        //once successful or error 
            console.log(error)
            if(error==null){
                return res.status(202).json({msg : "Bac creado correcta mente revisa tu carpeta"})
            }else{
                return res.status(404).json({msg : "No se pudo crear el back"})
            }
        });
       
        //res.json({msg : "Bac creado correcta mente revisa tu carpeta " + "BackupsGallardo"})
}

//mongoexport --db veterinaria --collection pacientes  --out C:\Users\dortiz\Desktop\BackupsGallardo\nuevo.cvs
//mongoimport  --db veterinaria --collection pacientes   --drop   --file C:\Users\dortiz\Desktop\BackupsGallardo\nuevo.csv
async function restore(req, res, next) {
    //backup mongodb database
        
        const cmd = "mongorestore --db veterinaria  \\\\SERVERBACKUP1\\Backups\\veterinaria"; // Command for mongodb dump process

        console.log("DB backup started ... ");
        console.log(cmd);
        exec.exec(cmd, function(error, stdout, stderr) {
        //once successful or error 
            console.log(error)
            if(error==null){
                return res.status(202).json({msg : "Restore creado correctamente"})
            }else{
                return res.status(404).json({msg : "No se pudo ejecutar el restore"})
            }
        });
       
        //res.json({msg : "Bac creado correcta mente revisa tu carpeta " + "BackupsGallardo"})
}


async function exportD(req, res, next) {
    //backup mongodb database
        
        const cmd = "mongoexport --db veterinaria --collection pacientes  --out  \\\\SERVERBACKUP1\\Backups\\nuevo.csv"; // Command for mongodb dump process

        console.log("DB backup started ... ");
        console.log(cmd);
        exec.exec(cmd, function(error, stdout, stderr) {
        //once successful or error 
            console.log(error)
            if(error==null){
                return res.status(202).json({msg : "exportacion de datos creada correctamente"})
            }else{
                return res.status(404).json({msg : "No se pudo ejecutar la exportacion"})
            }
        });
       
        //res.json({msg : "Bac creado correcta mente revisa tu carpeta " + "BackupsGallardo"})
}


async function impotaDatos(req, res, next) {
    //backup mongodb database
        
        const cmd = "mongoimport  --db veterinaria --collection pacientes   --drop   --file \\\\SERVERBACKUP1\\Backups\\nuevo.csv"; // Command for mongodb dump process

        console.log("DB backup started ... ");
        console.log(cmd);
        exec.exec(cmd, function(error, stdout, stderr) {
        //once successful or error 
            console.log(error)
            if(error==null){
                return res.status(202).json({msg : "importacion correcta"})
            }else{
                return res.status(404).json({msg : "No se pudo ejecutar la importacion"})
            }
        });
       
        //res.json({msg : "Bac creado correcta mente revisa tu carpeta " + "BackupsGallardo"})
}


export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidepasword,
    comprobarToken,
    nuevoPassword,
    back,
    restore,
    exportD,
    impotaDatos
} 