import express from  'express';
const router = express.Router();
import { agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,
    backNode} from "../controllers/pacienteControlador.js"
import chekAuth from "../middleware/authMiddleware.js"
router.route("/")
    .post(chekAuth, agregarPacientes)
    .get(chekAuth, obtenerPacientes);

router.route("/:id")
    .get(chekAuth, obtenerPaciente)
    .put(chekAuth, actualizarPaciente)
    .delete(chekAuth, eliminarPaciente)



export default router;