import type { NextApiRequest, NextApiResponse } from 'next';
import Quiz from '../../../models/Quiz';
import { connectDatabase } from '../../../utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  switch (method) {
    case 'POST':
      try {
        const quiz = await Quiz.create(request.body);
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
