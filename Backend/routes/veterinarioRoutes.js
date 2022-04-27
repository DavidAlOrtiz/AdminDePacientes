import express from 'express';
const router =  express.Router();
import { registrar, perfil, confirmar, autenticar, olvidepasword, comprobarToken, nuevoPassword, 
    back, restore, impotaDatos,exportD  } from '../controllers/veterinarioController.js'
import chekAuth from '../middleware/authMiddleware.js'


//
router.post('/', registrar)

router.get('/confirmar/:t', confirmar)

router.post("/login", autenticar )

router.post("/olvide-password", olvidepasword)

router.get("/olvide-password/:t", comprobarToken)
router.post("/olvide-password/:t", nuevoPassword)

//router.route("/olvide-password/:t").get(comprobarToken).post(nuevoPassword)

///
router.get('/perfil', chekAuth , perfil)

router.post('/back', back)

router.post("/restore", restore)
router.post("/exportar", exportD)
router.post("/importacion", impotaDatos)


export default router;
