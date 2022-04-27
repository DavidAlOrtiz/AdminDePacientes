import {Link} from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../componets/Alerta'
import clienteA from '../config/Clienteaxios'
function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === ''){
     setAlerta({
        msg:"El correo es obligatorio",
        error:true
      })
      return
    }

    try{
      const {data} = await clienteA.post('/veterinaria/olvide-password',{email});
      console.log(data)
      setAlerta({
        msg: data.msg
      })
    }catch(err){
      setAlerta({
        msg: err.response.data.msg,
        error:true
      })
    }
     
  }
  const {msg} = alerta
  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black  text-6xl">Recupera tu Acceso y no Pierdas 
            <span className="text-black">{""}Tus pacientes </span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta = {alerta} />}
             <form onSubmit={handleSubmit}>
             <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl  font-bold">Email</label>
                   <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                        type="email"
                        placeholder="Email"
                        value={email}
                       onChange={e => setEmail(e.target.value)}>
                    </input>
              </div>
              <input type="submit"
                        value="Enviar instrucciones"
                        className=" bg-indigo-700 h-10 w-96 rounded-xl  text-white uppercase font-bold mt-5
                         hover:cursor-pointer ">
              </input>
            </form>
            <nav className="mt-10 lg:flex ">
                        <Link className="block text-center my-5 md:mr-10 text-gray-500 "
                         to="/">Iniciar Sessión</Link>
                        <Link className="block text-center  my-5 text-gray-500 "
                         to="/registrar">Registrate</Link>
            </nav>
      </div>
    
    </>
  )
}

export default OlvidePassword