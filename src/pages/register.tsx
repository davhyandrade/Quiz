import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const inputNome = useRef<any>(null);
  const inputEmail = useRef<any>(null);
  const inputSenha = useRef<any>(null);
  const inputConfirmaSenha = useRef<any>(null);

  const imageEye = {
    close: (
      <g transform="translate(0.000000,214.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M452 1758 c-7 -7 -12 -19 -12 -28 0 -8 305 -320 678 -693 563 -563 682 -677 704 -677 33 0 54 31 39 59 -6 10 -312 318 -682 685 -476 472 -678 666 -693 666 -12 0 -27 -5 -34 -12z" />
        <path d="M992 1625 c-106 -19 -212 -54 -219 -71 -7 -19 54 -84 79 -84 10 0 51 9 91 21 105 30 252 36 357 15 172 -35 369 -131 551 -269 146 -110 173 -150 144 -210 -23 -47 -196 -183 -328 -257 -32 -18 -61 -39 -64 -47 -6 -16 54 -83 74 -83 21 0 168 95 258 165 164 129 188 163 189 261 0 82 -27 126 -134 215 -339 282 -684 401 -998 344z" />
        <path d="M494 1411 c-145 -96 -254 -187 -285 -238 -34 -54 -34 -162 0 -216 51 -83 306 -268 493 -357 252 -120 525 -141 759 -58 75 27 84 46 43 89 -33 35 -42 35 -141 7 -65 -19 -101 -23 -213 -22 -117 0 -147 4 -225 28 -169 51 -362 158 -530 296 -108 88 -120 140 -46 210 54 51 175 141 264 195 43 26 81 54 84 62 6 15 -53 83 -73 83 -6 0 -65 -36 -130 -79z" />
        <path d="M1065 1354 c-27 -9 -52 -18 -54 -20 -3 -2 13 -22 34 -44 37 -38 41 -40 86 -34 124 17 232 -89 215 -212 -6 -44 -4 -48 34 -85 l40 -40 17 38 c25 57 22 166 -6 229 -60 136 -226 212 -366 168z" />
      </g>
    ),
    open: (
      <g transform="translate(0.000000,214.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M1025 1629 c-224 -32 -537 -196 -739 -388 -74 -72 -86 -95 -86 -176 0 -82 12 -106 93 -181 177 -166 432 -310 644 -365 334 -85 700 28 1065 329 113 94 133 126 133 217 0 91 -20 123 -133 217 -333 275 -663 392 -977 347z m295 -123 c101 -22 155 -42 285 -107 128 -63 267 -157 358 -242 51 -47 57 -57 57 -92 0 -35 -6 -45 -57 -92 -140 -131 -349 -255 -538 -320 -108 -37 -113 -38 -255 -37 -129 0 -155 3 -235 28 -170 52 -343 149 -517 288 -140 113 -140 153 0 265 204 165 398 265 593 308 84 18 227 18 309 1z" />
        <path d="M1085 1356 c-61 -19 -96 -41 -137 -83 -114 -117 -111 -307 5 -421 63 -62 126 -87 217 -86 348 2 414 489 80 588 -63 19 -110 19 -165 2z m143 -111 c160 -67 160 -283 0 -350 -47 -19 -89 -19 -136 0 -157 66 -161 275 -7 346 49 23 94 24 143 4z" />
      </g>
    ),
  };

  const [isActiveButtonEyePessword, setIsActiveButtonEyePessword] = useState<any>({
    'confirma-senha': true,
    senha: true,
  });

  function handleClick(name: string) {
    setIsActiveButtonEyePessword((prev: any) => ({
      ...prev,
      [name]: true,
    }));
    if (isActiveButtonEyePessword[name]) {
      setIsActiveButtonEyePessword((prev: any) => ({
        ...prev,
        [name]: false,
      }));
      if (name === 'senha') {
        inputSenha.current.type = 'text';
      } else if (name === 'confirma-senha') {
        inputConfirmaSenha.current.type = 'text';
      }
    } else {
      setIsActiveButtonEyePessword((prev: any) => ({
        ...prev,
        [name]: true,
      }));
      if (name === 'senha') {
        inputSenha.current.type = 'password';
      } else if (name === 'confirma-senha') {
        inputConfirmaSenha.current.type = 'password';
      }
    }
  }

  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState<boolean>(false);

  async function handleRegisterUser(event: FormEvent) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    try {
      const user = await axios.post('/api/auth/register', {
        name: inputNome.current.value,
        email: inputEmail.current.value,
        password: inputSenha.current.value,
        confirmPassword: inputConfirmaSenha.current.value,
      });
      if (user.status === 201) {
        toast.success('Usuário cadastrado com sucesso!', {
          theme: 'colored',
        });
        Router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      setIsActiveButtonSubmit(false);
      console.log(error.message);
      console.log(error.response);
    }
  }

  return (
    <div className="form-register">
      <form onSubmit={handleRegisterUser}>
        <h1>
          Bem vindo ao <span>Quiz.com</span>
        </h1>
        <p>
          Já possui uma conta? Então <Link href="/login">Entre</Link>!
        </p>
        <div className="container-input">
          <input ref={inputNome} id="name" name="nome" type="text" placeholder="Email" required />
          <label htmlFor="name">Name</label>
        </div>
        <div className="container-input">
          <input ref={inputEmail} id="email" name="email" type="Email" placeholder="Email" required />
          <label htmlFor="email">E-mail</label>
        </div>
        <div>
          <div className="container-input">
            <input
              ref={inputSenha}
              id="password"
              name="senha"
              type="password"
              minLength={6}
              placeholder="Senha"
              required
            />
            <label htmlFor="password">Password</label>
            <svg
              onClick={() => handleClick(inputSenha.current.name)}
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="232.000000pt"
              height="214.000000pt"
              viewBox="0 0 232.000000 214.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              {inputSenha.current?.type === 'text' ? imageEye.open : imageEye.close}
            </svg>
          </div>
          <div className="container-input">
            <input
              ref={inputConfirmaSenha}
              id="confirm-password"
              name="confirma-senha"
              type="password"
              minLength={6}
              placeholder="Senha"
              required
            />
            <label htmlFor="confirm-password">{window.matchMedia('(max-width: 800px)') ? 'Repeat' : 'Repeat the Password'}</label>
            <svg
              onClick={() => handleClick(inputConfirmaSenha.current.name)}
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="232.000000pt"
              height="214.000000pt"
              viewBox="0 0 232.000000 214.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              {inputConfirmaSenha.current?.type === 'text' ? imageEye.open : imageEye.close}
            </svg>
          </div>
        </div>
        <input type="submit" value={isActiveButtonSubmit ? 'Registering...' : 'Register'} />
      </form>
    </div>
  );
}
