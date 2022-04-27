import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generalId from '../helper/generar_id.js';


const veterinariaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono : {
        type: String,
        default: null,
        trim:true,
    },
    web : {
        type: String,
        default:null
    },
    t: {
        type: String,
        default:generalId()
    },
    confirmado:{
        type : Boolean,
        default: false
    }

})


veterinariaSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log(this.password)
})

veterinariaSchema.methods.comprobarPassword = async function (passFormulario){
    return await bcrypt.compare(passFormulario, this.password);
}

const Veterinario = mongoose.model('Veterinario', veterinariaSchema );

export default Veterinario;