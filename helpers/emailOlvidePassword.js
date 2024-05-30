const nodemailer = require("nodemailer");

const emailRegistro = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = datos;

  const info = await transporter.sendMail({
    from: '"Hecho en Casa" <' + process.env.EMAIL_USER + ">",
    to: email,
    subject: "Restablece tu contraseña.",
    html: `
      <html>
      <head>
        <style>
          /* Estilos CSS en línea */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .title {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
          }
          .content {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">¡Hola ${name}!</h1>
          <p class="content">Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para hacerlo:</p>
          <p class="content"><a class="button" href="${process.env.FRONTEND_URL}/OlvidePassword?token=${token}">Confirmar Cuenta</a></p>
        </div>
      </body>
      </html>
    `,
  });
};

module.exports = emailRegistro;
