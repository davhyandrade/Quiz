import type { NextApiRequest, NextApiResponse } from 'next';
import Quiz from '../../../models/Quiz';
import { connectDatabase } from '../../../utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  const { id } = request.query;

  switch (method) {
    case 'PUT':
      try {
        await Quiz.findByIdAndUpdate(id, { ...request.body });
        response.status(200).json({ msg: 'Quiz alterado com sucesso!!' });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
    case 'DELETE':
      try {
        await Quiz.findByIdAndDelete(id, { ...request.body });
        response.status(200).json({ msg: 'Quiz deletado com sucesso!!' });
      } catch (error) {
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
      break;
  }
}
