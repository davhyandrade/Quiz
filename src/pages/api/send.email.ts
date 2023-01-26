import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;

  const { email, code } = request.body;

  if (method === 'POST') {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.USERMAIL,
          pass: process.env.PASSMAIL,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: `"Quiz" <${process.env.USERMAIL}>`,
        to: email,
        subject: 'Código de verificação',
        text: 'Seu código de verificação é:',
        html: `
        <section>
          <div>
            <span>Seu código de verificação é:</span>
            <h1>${code}</h1>
            <p>Utilize este código para redefinir a senha da sua conta no nosso site Quiz.</p>
          </div>
        </section>
        `,
      });

      response.status(200).json({ msg: 'Email enviado com sucesso!!', info });
    } catch (error) {
      response.status(500).json({ msg: 'Aconteceu um erro no servidor!', error });
      console.log(error);
    }
  }
}
