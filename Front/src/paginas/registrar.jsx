import {Link} from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../componets/Alerta'
import clienteA from '../config/Clienteaxios'
const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e => {
      e.preventDefault();
      if([nombre, email, password, repetirPassword].includes('')){
          setAlerta({msg:"Hay campos vacios", error : true});
          return
      }
      if(password !== repetirPassword){
          setAlerta({msg:"Los password no son iguales", error : true});
          return
      }
      if(password.length < 6){

        setAlerta({msg:"El password es muy corto minimo 6 caracteres ", error : true});
        return
    }
    setAlerta({})

    try{
        await clienteA.post(`/veterinaria/`, {nombre, email, password })
        setAlerta({
            msg: "Registrado correctamente registra tu correo",
            error : false
        })
    }catch(e){
        
        setAlerta({
            msg: e.response.data.msg,
            error:true
        })
    }

  }
  const {msg} = alerta
  return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black  text-6xl">Crea tu cuenta y administra  
          <span className="text-black">{""}Tus pacientes </span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta alerta={alerta}></Alerta> }
           
                    <form
                    onSubmit={handleSubmit}>
                    <  div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Nombre</label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="text"
                                placeholder="Tu nombre"
                                value = {nombre}
                                onChange={e => setNombre(e.target.value)}>
                               
                            </input>
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Email</label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Password </label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="password"
                                placeholder="Tu password "
                                value={password}
                                onChange={e => setPassword(e.target.value)}>
                            </input>
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl  font-bold">Repite tu Password </label>
                            <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                                type="password"
                                placeholder="Repite ts password  "
                                value={repetirPassword}
                                onChange={e => setRepetirPassword(e.target.value)}>
                            </input>
                        </div>
                        <input type="submit"
                        value="Crear cuenta "
                        className=" bg-indigo-700 h-10 w-96 rounded-xl  text-white uppercase font-bold mt-5
                         hover:cursor-pointer ">
                        </input>
                    </form>
                    <nav className="mt-10 lg:flex ">
                        <Link className="block text-center my-5 md:mr-10 text-gray-500 "
                         to="/">Iniciar Sessión</Link>
                        <Link className="block text-center  my-5 text-gray-500 "
                         to="/olvidePassword">Olvidaste tu password</Link>
                    </nav>
         </div>
      </>
  )
}

export default Registrar