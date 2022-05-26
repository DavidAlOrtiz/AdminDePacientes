import {BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthL from './layout/authLayout.jsx'
import RutaProtegida from './layout/rutaProtegida.jsx'

import Login from './paginas/login.jsx'
import Registrar from './paginas/registrar.jsx'
import ConfirmaCuenta from './paginas/confirmaCuenta.jsx'
import OlvidePassword from './paginas/olvidePassword.jsx'
import NuevoPassword from './paginas/NuevoPassword.jsx'
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx'
import EditarPerfil from './paginas/EditarPerfil.jsx';
import CambiarPassword from './paginas/CambiarPassword.jsx'
import {AuthProvider} from './context/AuthProvider'
import {PacientesProvaider} from './context/PacientesProvider'
function App() {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvaider>
          <Routes>
            <Route path="/" element={ < AuthL /> } >
                <Route index element={< Login /> } />
                <Route path="registrar" element={ < Registrar></Registrar>}/>
                <Route path="confirmarCuenta/:id" element={ <ConfirmaCuenta></ConfirmaCuenta>}></Route>
                <Route path="olvidePassword" element={ <OlvidePassword></OlvidePassword>}></Route>
                <Route path="olvidePassword/:id" element={ <NuevoPassword></NuevoPassword>}></Route>
            </Route>
            <Route path="/admin" element={<RutaProtegida></RutaProtegida>}>
              <Route index element={<AdministrarPacientes></AdministrarPacientes>} ></Route>
              <Route path="perfil" element={ < EditarPerfil></EditarPerfil>} ></Route>
              <Route path="cambiar-pasword" element={<CambiarPassword></CambiarPassword>} ></Route>
            </Route>
          </Routes>
        </PacientesProvaider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
