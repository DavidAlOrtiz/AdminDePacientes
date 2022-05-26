import { useState } from "react"
import Formulario from "../componets/Formulario"
import ListadoDeClientes from '../componets/ListadoDeClientes'

const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button type="button"  className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 
        rounded-md mb-10 md:hidden" onClick={() => setMostrarFormulario(! mostrarFormulario)}>
       { mostrarFormulario ? "Ocultar Formulario" : "mostrar Formulario"}
      </button>
      <div className={ ` md:block ${ mostrarFormulario ? 'block' : 'hidden' }   md:w-1/2 lg:w-2/5 `} >
        <Formulario></Formulario>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoDeClientes></ListadoDeClientes>
      </div>
    </div>
  )
}

export default AdministrarPacientes