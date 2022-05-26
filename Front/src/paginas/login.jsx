import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuht';
import Alerta from '../componets/Alerta';
import {useState} from 'react';
import clienteA from '../config/Clienteaxios'

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({})
    const {setAuth}  = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e =>{
        e.preventDefault();
        if(email===''){
            setAlerta({
                msg:"El correo es obligatorio",
                error:true
            })
            return
        }
        if(password===''){
            setAlerta({
                msg:"La contraseña es obligatoria",
                error: true
            })
            return
        }

        try {
            const {data} = await clienteA.post(`/veterinaria/login/`,{email, password});
            localStorage.setItem("token", data.token);
           
            navigate('/admin')
        } catch (e) {
            setAlerta({
                msg:e.response.data.msg,
                error:true
            })
        }
    }
    
    const {msg} = alerta;
    return (
        <>
           
                <div>
                    <h1 className="text-indigo-600 font-black  text-6xl">Inicia session y administra tus 
                    <span className="text-black">{""}pacientes</span></h1>
                </div>
                <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                    {msg &&  <Alerta alerta={alerta}></Alerta>}
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Email</label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="email"
                                placeholder="Email"
                                value = {email}
                                onChange={e => setEmail(e.target.value)}
                                >
                            </input>
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Contraseña</label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="password"
                                placeholder="Contraseña"
                                value = {password}
                                onChange={e => setPassword(e.target.value)}
                                >
                            </input>
                        </div>
                        <input type="submit"
                        value="iniciar session "
                        className=" bg-indigo-700 h-10 w-96 rounded-xl  text-white uppercase font-bold mt-5
                         hover:cursor-pointer ">
                        </input>
                    </form>
                    <nav className="mt-10 lg:flex ">
                        <Link className="block text-center my-5 md:mr-10 text-gray-500 "
                         to="/registrar">¿No tienes cuenta registrate?</Link>
                        <Link className="block text-center  my-5 text-gray-500 "
                         to="/olvidePassword">Olvidaste tu password</Link>
                    </nav>
                </div>
                
            
        </>
    )

}

export default Login