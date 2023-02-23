import type { NextApiRequest, NextApiResponse } from 'next';
import Quiz from '../../../models/Quiz';
import { connectDatabase } from '../../../utils/database';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  const { search } = request.body;

  if (!search) {
    return response.status(422).json({ msg: 'Nenhum dado inserido!' });
  }

  if (method === 'POST') {
    try {
      const quiz = await Quiz.find({ $text: {$search: search} });
      response.status(200).json({ msg: 'Pesquisa realizada com sucesso!!', quiz });
    } catch (error) {
      response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
      console.log(error);
    }
  }
}
