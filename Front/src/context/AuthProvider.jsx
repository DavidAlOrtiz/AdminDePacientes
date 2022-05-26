import {useState, useEffect, createContext} from 'react';
import clienteA from '../config/Clienteaxios'

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    useState(()=>{
        
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
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
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)

        }
        autenticarUsuario();
    }, [])
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }
    return (

        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
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