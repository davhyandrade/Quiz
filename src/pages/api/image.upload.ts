import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../services/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;
  const { imageBase64, preset } = request.body;

  if (!imageBase64) {
    return response.status(422).json({ msg: 'imageBase64 não enviado!!' });
  }

  if (!preset) {
    return response.status(422).json({ msg: 'preset não enviado!!' });
  }

  if (method === 'POST') {
    try {
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        upload_preset: preset,
        transformation: [{ quality: 'auto' }],
      });

      response.status(200).json({ msg: 'Imagem carregada com sucesso!!', uploadResponse });
    } catch (error) {
      response.status(500).json({ msg: 'Aconteceu um erro no servidor!', error });
      console.log(error);
    }
  }
}
