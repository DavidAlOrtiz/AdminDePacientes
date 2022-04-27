import {useParams,Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import clienteA from '../config/Clienteaxios'
import Alerta from '../componets/Alerta'
const ConfirmaCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const {id} = params;
  useEffect( ()=>{
      const confirmaCuenta = async ()=>{
        try{
          const url = `/veterinaria/confirmar/${id}`
          const {data} = await clienteA(url);
          setCuentaConfirmada(true);
          setAlerta({
            msg: data
          })
          console.log(data)
        }catch(e){
          setAlerta({
            msg:e.response.data.msg,
            error: true
          })
        }
        setCargando(false)
      }
      confirmaCuenta();
  },[])
 
  return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black  text-6xl">Confirma tu cuenta y administra  
          <span className="text-black">{""}Tus pacientes </span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
           {!cargando &&  <Alerta alerta={alerta}></Alerta> }
           {cuentaConfirmada && (
             <Link className="block text-center my-5 md:mr-10 text-gray-500 "
             to="/">Iniciar Sessión</Link>
           )}
                  
         </div>
      </>
    
  )
}

export default ConfirmaCuenta