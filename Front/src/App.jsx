import {BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthL from './layout/authLayout.jsx'
import Login from './paginas/login.jsx'
import Registrar from './paginas/registrar.jsx'
import ConfirmaCuenta from './paginas/confirmaCuenta.jsx'
import OlvidePassword from './paginas/olvidePassword.jsx'
import NuevoPassword from './paginas/NuevoPassword.jsx'
import {AuthProvider} from './context/AuthProvider'
function App() {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ < AuthL /> } >
              <Route index element={< Login /> } />
              <Route path="registrar" element={ < Registrar></Registrar>}/>
              <Route path="confirmarCuenta/:id" element={ <ConfirmaCuenta></ConfirmaCuenta>}></Route>
              <Route path="olvidePassword" element={ <OlvidePassword></OlvidePassword>}></Route>
              <Route path="olvidePassword/:id" element={ <NuevoPassword></NuevoPassword>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
