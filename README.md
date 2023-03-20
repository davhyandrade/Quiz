# Aplicação de Questionários

> Status: Development

Projeto ao qual possibilita a criação e edição de quizzes, tendo presente sistema de login completo com token jwt, autenticação e validação, sendo possível realizar login, registro, foto de perfil, configurações da conta e até redefinir a senha.

![yourquiz](https://user-images.githubusercontent.com/109045257/226221468-7e9faebd-4894-483d-83b3-52dce6899cea.png)

# Desenvolvimento

Desenvolvido pelo NextJS, Typescrit, Sass e MongoDB, ao qual foi trabalhado array de objetos para criar os quizzes, além do sistema de login com token jwt.

Principais bibliotecas aprendidas ao qual foram inseridas no Projeto:

### Nodemailer

Biblioteca do NodeJS que possibilita que o sistema consiga realizar o envio de e-mail para um usuário.

```
  ├── src
  │   ├── pages
  │       ├── api
  |           ├── send.email
```

```ts
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
            text: `Seu código de verificação é: ${code}`,
          });

          response.status(200).json({ msg: 'Código enviado para o seu E-mail!', info });
        } catch (error) {
          response.status(500).json({ msg: 'Aconteceu um erro no servidor!');
          console.log(error);
        }
      }
    }
```

##

### Cloudinary

Plataforma de hospedagem de imagens.

* Ao qual consiste em pegar imagem em base64 e após o upload retornar uma url, sintaxe:
    
```ts
  // Função do input file para adquirir a imagem em base64
  
  const [setPreviewSource, previewSource] = useState();

  function previewFile(file: any) {
    const reader: any = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }
```

```
  ├── src
  │   ├── services
  │       ├── cloudinary
```

```ts
  import { v2 as cloudinary } from 'cloudinary';

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  export { cloudinary };
```

```
  ├── src
  │   ├── pages
  │       ├── api
  |           ├── image.upload
```

```ts
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
        response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
        console.log(error);
      }
    }
  }
```
