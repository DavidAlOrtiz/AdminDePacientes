import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuht'
function Header() {
  const {cerrarSesion} = useAuth()
  return (
    <>
      <header className="py-10 bg-indigo-600">
         <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center ">
            <h1 className="font-bold text-2xl text-indigo-200 text-center" >Administrador de pacientes de {''} 
              <span className="text-white font-black">Veterinaria</span></h1>
            <nav className="flex flex-col lg:flex-row mt-5 lg:mt-0 items-center gap-4">
              <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
              <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil</Link>
             
              <button type="button" onClick={cerrarSesion}
               className="text-white text-sm uppercase font-bold">Cerrar sesion</button>
            
            </nav>
         </div>
      </header>
    </>
  )
}

export default Header