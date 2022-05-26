import { useState, useEffect} from "react"
import Alerta from '../componets/Alerta'
import usePacientes from '../hooks/usePacientes'


const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState("");

  const [alerta, setAlerta] = useState("");
  const {guardarPaciente, paciente } = usePacientes();

  useEffect( ()=>{
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }

  },[paciente])
  
  const handleSubmit = (e) =>{
    e.preventDefault();

    //Validar el formulario d
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setAlerta({
        msg: 'Todos los datos son requeridos',
        error: true
      })
      return
    }
   
    guardarPaciente({
      nombre, 
      propietario,
      email,
      fecha,
      sintomas,
      id})
      setAlerta({
        msg: 'Guardado correctamente'
      })
      setNombre('')
  }
  const {msg} = alerta
  return (
    <>
      <p className="mb-10 text-center text-lg">Añade tus pacientes  y {''}
      <span className="text-indigo-600 font-bold">Administralos </span>  </p>
      
      <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-3 shadow-md rounded-md">
        <div  className="mb-5">
          <label htmlFor="mascota"
          className="text-gray-700 font-bold uppercase"> Nombre mascota</label>
          <input type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de tu mascota" id="mascota" 
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          ></input>
        </div>
        <div  className="mb-5">
          <label htmlFor="propietario"
          className="text-gray-700 font-bold uppercase"> Nombre propietario</label>
          <input type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de propetario" id="propietario"
          value={propietario}
          onChange={e => setPropietario(e.target.value)}
          ></input>
        </div>
        <div  className="mb-5">
          <label htmlFor="email"
          className="text-gray-700 font-bold uppercase"> email</label>
          <input type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="amail" id="email" value={email} onChange={e => setEmail(e.target.value)} >

          </input>
        </div>
        <div  className="mb-5">
          <label htmlFor="fecha"
          className="text-gray-700 font-bold uppercase"> Fecha</label>
          <input type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="fecha" id="fecha" value={fecha} onChange={e => setFecha(e.target.value)} ></input>
        </div>
        <div  className="mb-5">
          <label htmlFor="sintomas"
          className="text-gray-700 font-bold uppercase"> Sintomas</label>
          <textarea type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="sintomas" id="sintomas" value={sintomas} onChange={e => setSintomas(e.target.value)}></textarea>
        </div>
        <input  value={id ? 'Guardar Cambios' : " Agregar Pacientes"} type="submit"
          className="bg-indigo-600 w-full py-3 text-white
          uppercase font-bold hover:bg-indigo-900
          cursor-pointer transition-colors "
        />
      </form>
      {msg && <Alerta alerta={alerta}></Alerta> }
    </>
  )
}

export default Formulario