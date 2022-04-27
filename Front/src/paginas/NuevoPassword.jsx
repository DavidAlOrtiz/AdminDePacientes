import {useState, useEffect} from 'react'
import {useParams, Link}  from 'react-router-dom'
import Alerta from '../componets/Alerta'
import clienteA from '../config/Clienteaxios'
const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({})
  const paramaetros = useParams();
  const [tookenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordM] = useState(false);
  const {id} = paramaetros
    useEffect( ()=>{
      const comprobarToken = async () =>{
        try{
          await clienteA(`/veterinaria/olvide-password/${id}`);
          setAlerta({
            msg: 'Coloca tu nuevo password'
          })
          setTokenValido(true)
        }catch(e){
          setAlerta({
            msg: "hubo un erro con el enlace",
            error: true
          })
        }
      }
      comprobarToken();
    },[])

    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password.length < 6 ){
        setAlerta({
          msg:"El pasword debe ser minimo de 6 caracteres",
          error: true
        })
        return;
      }
      try {
        const url = `/veterinaria/olvide-password/${id}`;
        const {data} = await clienteA.post(url,{password});
        setAlerta({
          msg : data.msg
        })
        setPasswordM(true);
      }catch(e){
        setAlerta({
          msg:e.response.data.msg,
          error:true
        })
      }
    }

    const {msg} = alerta

   

  return (
    <>
     <div>
            <h1 className="text-indigo-600 font-black  text-6xl">Restableca tus pacientes y no pierdas
            <span className="text-black">{""}Tus pacientes </span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta}></Alerta>}
        {tookenValido && (
          <>
         <form onSubmit={handleSubmit}>
         <div className="my-5">
             <label className="uppercase text-gray-600 block text-xl  font-bold">Nuevo Password </label>
             <input className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl "
                 type="password"
                 placeholder="Tu password "
                 value={password}
                 onChange={e => setPassword(e.target.value)}>
               </input>
         </div>
         <input type="submit"
             value="Guardar Nuevo Password"
              className=" bg-indigo-700 h-10 w-96 rounded-xl  text-white uppercase font-bold mt-5
              hover:cursor-pointer ">
         </input>
       </form>
       
      </>
       )
      }

      {passwordModificado &&
      <>
      <Link className="block text-center my-5 md:mr-10 text-gray-500 "
                         to="/">Iniciar Sessión</Link>
      </>
      }
        
      </div>
    </>
  )
}

export default NuevoPassword