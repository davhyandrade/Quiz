import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../utils/database';
import bcrypt from 'bcrypt';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

const SECRET: any = process.env.SECRET;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  if (method === 'POST') {
    const { email, password } = request.body;

    if (!email) {
      return response.status(422).json({ msg: 'O Email é obrigatório!' });
    }

    if (!password) {  
      return response.status(422).json({ msg: 'A Senha é obrigatório!' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return response.status(404).json({ msg: 'E-mail ou Senha incorreto!' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return response.status(404).json({ msg: 'E-mail ou Senha incorreto!' });
    }

    try {
      const token = jwt.sign(
        {
          id: user._id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        },
        SECRET
      );

      response.setHeader('authorization', `Bearer ${token}`);

      response.status(200).json({
        msg: 'Autenticação realizada com sucesso!',
        token,
      });
    } catch (error) {
      response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
      console.log(error);
    }
  }
}