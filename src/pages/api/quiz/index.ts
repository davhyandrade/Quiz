import type { NextApiRequest, NextApiResponse } from 'next';
import Quiz from '../../../models/Quiz';
import { connectDatabase } from '../../../utils/database';
import jwt from 'jsonwebtoken';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const authHeader: any = request.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (request.method !== 'GET') {
    if (!token) {
      return response.status(401).json({ msg: 'Acesso negado!' });
    }
  
    try {
      const SECRET: any = process.env.SECRET;
      jwt.verify(token, SECRET);
    } catch (error) {
      response.status(400).json({ msg: 'Token inválido!' });
      console.log(error);
    }
  }

  const tokenDecode = jwt.decode(token) as any;
  
  const { method } = request;

  switch (method) {
    case 'POST':
      try {
        const quiz = await Quiz.create({ ...request.body, user: tokenDecode.id });
        response.status(200).json({ msg: 'Quiz criado com sucesso!!', quiz });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
    case 'GET':
      try {
        const quizzes = await Quiz.find();
        response.status(200).json({ msg: 'Listagem realizada com sucesso!!', quizzes });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
  }
}
