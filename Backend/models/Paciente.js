import mongoose from "mongoose";

const pacoienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    propietario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    fecha:{
        type:Date,
        required: true,
        default:  Date.now()
    },
    sintomas:{
        type: String,
        require: true
    },
    veterinario:{
        type: mongoose.Types.ObjectId,
        ref: 'Veterinario'
    }
},{
    timestamp: true,
}

)

const Paciente = mongoose.model("Paciente", pacoienteSchema);

export default Paciente;