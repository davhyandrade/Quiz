import axios from 'axios';
import Router from 'next/router';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/layout';

export default function ForgotPassword() {
  const { user, fetchDataUser, isAuth, setIsActiveLoading } = useContext(Context);

  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState<boolean>(false);
  const [codeVerify, setCodeVerify] = useState<number>();

  const [verifyIsAuth, setVerifyIsAuth] = useState<boolean>(false);
  const [isActiveNewPassword, setIsActiveNewPassword] = useState<boolean>(false);
  const [emailUser, setEmailUser] = useState<any>();

  const inputNewPassword = useRef<any>(null);
  const inputEmail = useRef<any>(null);
  const inputNumber1 = useRef<any>(null);
  const inputNumber2 = useRef<any>(null);
  const inputNumber3 = useRef<any>(null);
  const inputNumber4 = useRef<any>(null);
  const inputNumber5 = useRef<any>(null);
  const inputNumber6 = useRef<any>(null);

  async function handleNewPassword(event: FormEvent) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    try {
      const updateUser = await axios.put(`/api/auth/forgot.password`, {
        email: emailUser,
        password: inputNewPassword.current.value,
      });
      toast.success(updateUser.data.msg, {
        theme: 'colored',
      });
      Router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      console.log(error);
    }
    setIsActiveButtonSubmit(false);
  }

  function formSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    if (!verifyIsAuth)
      return [
        setEmailUser(inputEmail.current.value),
        setVerifyIsAuth(true),
        setIsActiveLoading(true),
        setIsActiveButtonSubmit(false),
      ];
    const code = parseInt(
      inputNumber1.current.value.toString() +
        inputNumber2.current.value.toString() +
        inputNumber3.current.value.toString() +
        inputNumber4.current.value.toString() +
        inputNumber5.current.value.toString() +
        inputNumber6.current.value.toString()
    );
    if (code === codeVerify) {
      setIsActiveNewPassword(true);
    } else {
      toast.error('Código incorreto!!', {
        theme: 'colored',
      });
    }
    setIsActiveButtonSubmit(false);
  }

  async function sendEmail() {
    try {
      const email = await axios.post('/api/send.email', {
        email: emailUser,
        code: codeVerify,
      });
      console.log(email);
      toast.success(email.data.msg, {
        theme: 'colored',
      });
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      console.log(error);
    }
  }

  function handleGenerateCode() {
    let i = 1;
    let codigo = Math.floor(Math.random() * 10).toString();
    for (i; i < 6; i++) {
      codigo = codigo + Math.floor(Math.random() * 10).toString();
    }
    setCodeVerify(parseInt(codigo));
  }

  useEffect(() => {
    if (typeof codeVerify !== 'undefined') {
      sendEmail();
    }
  }, [codeVerify]);

  useEffect(() => {
    if (isAuth) {
      setVerifyIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    if (verifyIsAuth) {
      fetchDataUser();
      if (!isActiveNewPassword) {
        setTimeout(() => {
          handleGenerateCode();
          inputNumber1.current.focus();
        }, 2500);
      }
    }
  }, [verifyIsAuth]);

  useEffect(() => {
    if (isAuth) {
      setEmailUser(user.email);
    }
  }, []);

  function handleKeyDownInputs(event: any) {
    if (
      event.target.value.length >= 1 &&
      event.key !== 'Backspace' &&
      event.key !== 'Enter' &&
      event.key !== 'ArrowRight'
    ) {
      return event.preventDefault();
    }
    if (event.key === 'Backspace' && event.target.value.length === 0) {
      switch (event.target.id) {
        case '1':
          return;
        case '2':
          inputNumber1.current.focus();
          break;
        case '3':
          inputNumber2.current.focus();
          break;
        case '4':
          inputNumber3.current.focus();
          break;
        case '5':
          inputNumber4.current.focus();
          break;
        case '6':
          inputNumber5.current.focus();
          break;
      }
    }
    if (event.key === 'ArrowRight') {
      switch (event.target.id) {
        case '1':
          inputNumber2.current.focus();
          break;
        case '2':
          inputNumber3.current.focus();
          break;
        case '3':
          inputNumber4.current.focus();
          break;
        case '4':
          inputNumber5.current.focus();
          break;
        case '5':
          inputNumber6.current.focus();
          break;
        case '6':
          break;
      }
    }
    if (event.key === 'ArrowLeft') {
      switch (event.target.id) {
        case '1':
          break;
        case '2':
          inputNumber1.current.focus();
          break;
        case '3':
          inputNumber2.current.focus();
          break;
        case '4':
          inputNumber3.current.focus();
          break;
        case '5':
          inputNumber4.current.focus();
          break;
        case '6':
          inputNumber5.current.focus();
          break;
      }
    }
  }

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

  const [imageEyePassword, setImageEyePassword] = useState<any>(imageEye.close);

  const [isActiveButtonEyePassword, setIsActiveButtonEyePassword] = useState<boolean>(true);

  function handleClick() {
    if (isActiveButtonEyePassword) {
      setIsActiveButtonEyePassword(false);
      setImageEyePassword(imageEye.open);
      inputNewPassword.current.type = 'text';
    } else {
      setImageEyePassword(imageEye.close);
      setIsActiveButtonEyePassword(true);
      inputNewPassword.current.type = 'password';
    }
  }

  return (
    <div className="forgot-password-field">
      {isActiveNewPassword ? (
        <form onSubmit={handleNewPassword}>
          <h1>
            Digite sua nova <span>Senha</span>
          </h1>
          <span>Ao qual substituirá a sua senha anterior</span>
          <div className="div-input">
            <input
              ref={inputNewPassword}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <label htmlFor="password">New Password</label>
            <svg
              onClick={handleClick}
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="232.000000pt"
              height="214.000000pt"
              viewBox="0 0 232.000000 214.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              {imageEyePassword}
            </svg>
          </div>
          <input type="submit" value={isActiveButtonSubmit ? 'Saving...' : 'To Save'} />
        </form>
      ) : (
        <form onSubmit={formSubmit}>
          {verifyIsAuth ? (
            <>
              <h1>
                Código de <span>Verificação</span>
              </h1>
              <span>
                Insere-o para redefinir a sua senha do <span>Quiz</span>
              </span>
              <div>
                <input
                  ref={inputNumber1}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="1"
                  placeholder="0"
                  required
                />
                <input
                  ref={inputNumber2}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="2"
                  placeholder="0"
                  required
                />
                <input
                  ref={inputNumber3}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="3"
                  placeholder="0"
                  required
                />
                <input
                  ref={inputNumber4}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="4"
                  placeholder="0"
                  required
                />
                <input
                  ref={inputNumber5}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="5"
                  placeholder="0"
                  required
                />
                <input
                  ref={inputNumber6}
                  onKeyDown={handleKeyDownInputs}
                  type="number"
                  id="6"
                  placeholder="0"
                  required
                />
              </div>
              <input type="submit" value={isActiveButtonSubmit ? 'Verifying...' : 'Verify'} />
            </>
          ) : (
            <>
              <h1>
                Digite seu <span>E-mail</span>
              </h1>
              <span>Ao qual será recebido o código de verificação</span>
              <div className="div-input">
                <input ref={inputEmail} id="email" name="email" type="Email" placeholder="Email" required />
                <label htmlFor="email">E-mail</label>
              </div>
              <input type="submit" value={isActiveButtonSubmit ? 'Entering...' : 'To Enter'} />
            </>
          )}
        </form>
      )}
    </div>
  );
}
