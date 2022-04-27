import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js"

const chekAuth = async (req, res, next ) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JTW_SECRET)

            req.veterinario = await Veterinario.findById(decode.id).select("-password -token -confirmado");
            return next();
        }catch(e){
            const error = new Error("Token invalido ");
            return res.status(403).json({msg: e.message})
        }
    }
    
    if(!token){
        const error = new Error("Token invalido o inexistente");
        res.status(403).json({msg: error.message})
    }
    

    next();
}

export default  chekAuth;