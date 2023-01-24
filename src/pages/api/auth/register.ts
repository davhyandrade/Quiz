import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../utils/database';
import bcrypt from 'bcrypt';
import User from '../../../models/User';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  switch (method) {
    case 'POST':
      const { name, email, password, confirmPassword } = request.body;

      if (!name) {
        return response.status(422).json({ msg: 'O Nome é obrigatório!' });
      }

      if (!email) {
        return response.status(422).json({ msg: 'O Email é obrigatório!' });
      }

      if (!password) {
        return response.status(422).json({ msg: 'A Senha é obrigatório!' });
      }

      if (password !== confirmPassword) {
        return response.status(422).json({ msg: 'As senhas estão diferentes!' });
      }

      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return response.status(422).json({ msg: 'Por favor, utilize outro E-mail!' });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      try {
        const user = await User.create({ name, email, password: passwordHash });

        response.status(201).json({
          msg: 'usuario criado com sucesso!!',
          user: user,
        });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
    case 'GET':
      try {
        const users = await User.find();

        response.status(201).json({
          user: users,
        });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
  }
}