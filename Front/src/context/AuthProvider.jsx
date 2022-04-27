import {useState, useEffect, createContext} from 'react';
import clienteA from '../config/Clienteaxios'

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({})
    useState(()=>{

        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                return ;
            }

            const configuracion = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const {data} = await clienteA('/veterinaria/perfil', configuracion)
                console.log(data)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

        }
        autenticarUsuario();
    }, [])
    return (

        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >

            {children}

        </AuthContext.Provider>

    )
}

export {
    AuthProvider
};

export default AuthContext;