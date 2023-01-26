import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../utils/database';
import bcrypt from 'bcrypt';
import User from '../../../models/User';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  const { password, email } = request.body;
  
  if (method === 'PUT') {
      const userExists = await User.findOne({ email: email });

      if (!userExists) {
        return response.status(422).json({ msg: 'Conta não encotrada!' });
      }

      if (!password) {
        return response.status(422).json({ msg: 'A Senha é obrigatório!' });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      try {
        await User.findByIdAndUpdate(userExists._id, { password: passwordHash });
        response.status(200).json({ msg: 'Senha alterada com sucesso!!' });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
  }
}