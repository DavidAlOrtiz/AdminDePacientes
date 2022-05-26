import usePacientes from '../hooks/usePacientes'

const Paciente = (paciente) => {
  const {setEdicion, eliminarPaciente} = usePacientes();
  console.log(paciente);
  const { email, fecha, nombre, propetario, sintomas, _id } = paciente;

  const formatoFecha = (fecha) => {
    return Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(fecha);
  };

  return (
    <div className="mx-5 my-10 bg-white shadow-md  px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 my-2">
        Nombre: {""}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Propetario: {""}
        <span className="font-normal normal-case text-black">{propetario}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Email de contacto: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Fecha de alta : {""}
        <span className="font-normal normal-case text-black">
          {formatoFecha(fecha)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Sintomas: {""}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>
      <div className="flex justify-between my-5">
        <button
          className="py-2 px-10  bg-indigo-600 hover:bg-indigo-700 text-white
          uppercase font-bold rounded-md"
          onClick={()=>setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          className="py-2 px-10  bg-red-600 hover:bg-red-700 text-white
          uppercase font-bold rounded-md"
          onClick = {() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
