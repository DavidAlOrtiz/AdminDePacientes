import nodemailer from 'nodemailer'

const emailRegistro = async (datos) =>{

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
        subject: 'Comprueba tu cuenta',
        text: "Comprueba tu cuenta en apv",
        html : `<p>Hola: ${nombre}, comprueba tu cuenta en apv.</p>
          <p>Tu cuenta ya esta lista solo tienes que comprobarla da click en el enlace:
          <a href="${process.env.FRONT_URL}/confirmarCuenta/${t}">Comprobar Cuenta</a></p>


          <p>Si no creaste la cuenta ignora este mensaje</p>
        `
      })

      console.log("Mensaje enviado" + info.messageId)
}

export default emailRegistro