import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuht'
import Header from '../componets/Header'
import Footer from '../componets/Footer'
const RutaProtegida = () => {

  const { auth ,cargando} = useAuth();
  if(cargando){
     return  "Cargando"
  }

  return (
    <>
        <Header></Header>
        
        { auth?.veterinario  ? ( 
              <main className="container mx-auto mt-10">
                <Outlet></Outlet>
              </main>
        ): <Navigate to="/"></Navigate> }
        <Footer></Footer>
    </>
  )
}

export default RutaProtegida