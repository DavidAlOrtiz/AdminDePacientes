import {useContext} from 'react'
import PacienteContex from '../context/PacientesProvider'

const usePacientes = () =>{
    return useContext(PacienteContex)
}

export default usePacientes;