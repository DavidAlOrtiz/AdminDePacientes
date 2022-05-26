import { createContext, useState, useEffect } from "react";
import clienteA from "../config/Clienteaxios";

const PacienteContex = createContext();

const PacientesProvaider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");

        const conf = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        };

        const { data } = await clienteA("/pacientes", conf);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const conf = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteA.put(
          `/pacientes/${paciente.id}`,
          paciente,
          conf
        );
        const pacienteAcualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data.id ? data : pacienteState
        );
        setPaciente(pacienteAcualizado);
      } catch (error) {}
    } else {
      try {
        const { data } = await clienteA.post("/pacientes", paciente, conf);
        console.log(data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.msg);
      }
    }
  };
  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };
  const eliminarPaciente = async (id) => {
    const confirmar = confirm("Quieres eliminar");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const conf = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        };
        const {data} = await clienteA.delete(`/pacientes/${id}`, conf);
        console.log(data);
        const pacienteAcualizado = pacientes.filter(pacientesState => pacientesState._id !== id )
        setPacientes(pacienteAcualizado)
      } catch (error) {}
    }
  };
  return (
    <PacienteContex.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacienteContex.Provider>
  );
};

export { PacientesProvaider };

export default PacienteContex;
