import Paciente from "../models/Paciente.js";
import backup from 'mongodb-backup';

const agregarPacientes = async (req, res, next) => {
    
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.body._id;
    try {

        const pacienteGuardado =await paciente.save();
        res.json(pacienteGuardado);
    }catch (e) {
        console.log(e);
    }
    console.log(req.body);
}

const obtenerPacientes = async (req, res, next) => {
    const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);
    res.json(pacientes);

}

const obtenerPaciente = async (req, res, next) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
       return  res.status(404).json({msg:"no encontrado"})
    }
    
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { 
        return res.json({msg:"accion no valida"})
    }
    res.json(paciente)
}

const actualizarPaciente = async (req, res, next) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        return res.status(404).json({msg:"no encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { 
        return res.json({msg:"accion no valida"})
    }
    //Nombre de usuario
    paciente.nombre = body.body.nombre || paciente.nombre ;
    paciente.propietario = body.body.propietario || paciente.propietario;
    paciente.email = body.body.email || paciente.email;
    paciente.fecha = body.body.fecha ||  paciente.fecha;
    paciente.sintomas = body.body.fecha || paciente.sintomas;
    try{
        const pacienteActualizado =  await paciente.save();
        res.json(pacienteActualizado)
    }catch(error){
        console.log(error)
    }
}

const eliminarPaciente = async (req, res, next) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente){
        return res.status(404).json({msg:"no encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { 
        return res.json({msg:"accion no valida"})
    }
    try{
        await paciente.deleteOne();
        res.json({msg:"Paciente eliminado"})
    }catch(e){
        console.log(e)
    }
}

const backNode = async (req, res, next) => {
 
   
    res.json({msg:"back creado"});
}


export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,
    backNode
}