import jwt from "jsonwebtoken";

const generarJWT = (id) =>{
    return jwt.sign({id}, process.env.JTW_SECRET, {
        expiresIn : "30d",

    });
}

export default  generarJWT