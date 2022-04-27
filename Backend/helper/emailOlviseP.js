import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) =>{

    const transporte = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //Enviar el email 
      const {email, nombre, t} = datos;
      const info = await transporte.sendMail({
        from: "Administrador de pacientes",
        to : email,
        subject: 'Restablece tu password',
        text: "Restablece tu password",
        html : `<p>Hola: ${nombre}, Solicitaste restablecer tu password.</p>
          <p>Sigue el soguiente enlace para generar una nueva contraseña:
          <a href="${process.env.FRONT_URL}/olvidePassword/${t}">Restablecer password</a></p>


          <p>Si no creaste la cuenta ignora este mensaje</p>
        `
      })

      console.log("Mensaje enviado" + info.messageId)
}

export default emailOlvidePassword;