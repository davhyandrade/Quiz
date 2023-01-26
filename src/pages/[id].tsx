import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import { Context } from '../context/layout';

interface IProps {
  isActiveQuiz: boolean | undefined;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.isActiveQuiz &&
    `body {
      overflow: hidden;
    }`}
`;

export default function Quizzes() {
  const { quiz, setQuiz } = useContext(Context);
  const Router = useRouter();

  let id = Router.query.id;

  async function fetchQuiz() {
    try {
      if (typeof Router.query.id === 'undefined') id = window.location.href.split('/').pop();
      const data = await axios.get(`api/quiz/${id}`);
      setQuiz(data.data.quiz);
    } catch (error) {
      Router.push('/');
      toast.error('Aconteceu um erro no servidor!', {
        theme: 'colored',
      });
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  const { setIsActiveQuiz } = useContext(Context);

  const { isActiveQuiz } = useContext(Context);

  return (
    <>
      <GlobalStyles isActiveQuiz={isActiveQuiz} />
      {quiz && (
        <div className="quiz-field">
          <div className="position">
            <div>
              <img src={quiz.image} alt="faddfds" />
              <div>
                <span>Quantidade de Páginas</span>
                <span>{quiz.pages.length}</span>
              </div>
            </div>
            <div> 
              <h1>
                {quiz.title}
                <div>
                  <div data-description='Voltar'>
                    <svg
                      onClick={() => Router.push('/')}
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="500.000000pt"
                      height="500.000000pt"
                      viewBox="0 0 500.000000 500.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M2310 4374 c-14 -2 -59 -9 -100 -15 -417 -60 -838 -290 -1121 -612 -509 -580 -620 -1393 -284 -2082 241 -493 687 -862 1210 -998 443 -116 900 -73 1306 121 502 241 877 700 1013 1237 71 284 75 612 11 892 -133 581 -553 1082 -1103 1315 -242 103 -414 138 -697 143 -115 2 -221 2 -235 -1z m519 -253 c665 -144 1160 -638 1301 -1296 16 -73 23 -151 27 -285 5 -160 2 -202 -16 -312 -62 -366 -222 -671 -483 -924 -124 -120 -238 -204 -378 -277 -478 -251 -1030 -259 -1510 -23 -438 216 -760 615 -879 1091 -212 850 285 1726 1126 1984 85 26 184 48 298 65 17 2 118 3 225 1 149 -3 217 -8 289 -24z" />
                        <path d="M2694 3681 c-54 -25 -1054 -1023 -1085 -1083 -25 -49 -29 -134 -10 -193 11 -32 111 -138 525 -553 284 -285 531 -525 556 -540 60 -36 163 -38 226 -5 118 62 168 213 108 327 -10 20 -203 221 -429 447 l-409 410 416 417 c461 462 455 454 446 571 -6 81 -46 145 -118 189 -47 27 -63 32 -120 32 -42 0 -80 -7 -106 -19z" />
                      </g>
                    </svg>
                  </div>
                  <div data-description='Compartilhar'>
                    <svg
                      onClick={() =>
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(() => {
                            toast('Link copiado com sucesso!', {
                              theme: 'colored',
                            });
                          })
                          .catch(() => {
                            toast('Algo deu errado!', {
                              theme: 'colored',
                            });
                          })
                      }
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="303.000000pt"
                      height="280.000000pt"
                      viewBox="0 0 303.000000 280.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path
                          d="M1828 2360 c-27 -21 -28 -24 -28 -121 l0 -99 -52 0 c-29 0 -105 -8 -168 -19 -385 -63 -650 -258 -764 -561 -36 -94 -45 -132 -61 -254 -30 -218 -18 -266 64 -266 54 0 63 8 125 105 21 33 80 101 130 150 72 72 109 100 181 137 139 71 277 108 458 123 l87 7 0 -94 c0 -86 2 -97 23 -116 44 -41 73 -32 311 104 122 70 239 137 261 150 22 12 103 58 180 102 l140 79 3 60 c2 47 -1 62 -15 75 -43 37 -781 450 -813 455 -26 4 -42 -1 -62 -17z m397 -360 c138 -78 251 -143 253 -145 3 -3 -506 -295 -514 -295 -2 0 -4 28 -4 62 0 95 -5 98 -171 98 -148 0 -311 -23 -434 -60 -99 -31 -242 -103 -310 -158 -104 -84 -99 -83 -75 -21 119 301 405 473 822 496 155 8 168 17 168 109 0 36 3 63 8 61 4 -3 120 -68 257 -147z"
                        />
                        <path
                          d="M756 2253 c-374 -3 -380 -4 -403 -25 l-23 -21 0 -867 0 -867 26 -24 26 -24 829 -3 c755 -2 833 -1 865 14 64 31 64 30 64 473 l0 400 -26 20 c-15 12 -39 21 -54 21 -15 0 -39 -9 -54 -21 l-26 -20 0 -360 0 -359 -755 0 -755 0 0 750 0 750 360 0 361 0 24 25 c50 49 23 131 -45 137 -19 2 -206 2 -414 1z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </h1>
              <span>{quiz.description}</span>
              <p>Questões de múltipla escolha, com resposta única referente ao tema abordado pelo Quiz.</p>
              <button onClick={() => setIsActiveQuiz(true)}>Começar</button>
              <div className="data-quiz">
                <span>
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="500.000000pt"
                    height="500.000000pt"
                    viewBox="0 0 500.000000 500.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M1544 4009 c-15 -17 -20 -40 -22 -109 l-4 -88 -191 -4 c-186 -3 -194 -4 -254 -32 -73 -33 -150 -109 -184 -182 -24 -49 -24 -51 -30 -544 -10 -784 -10 -1449 1 -1515 26 -161 139 -280 298 -314 75 -16 2359 -16 2434 0 160 35 269 144 298 300 7 37 10 388 8 1030 l-3 974 -31 65 c-39 82 -101 144 -184 184 -65 31 -66 31 -257 34 l-193 4 0 83 c0 99 -20 135 -74 135 -55 0 -70 -28 -74 -131 l-4 -89 -704 0 -704 0 0 84 c0 69 -4 88 -21 110 -26 33 -77 36 -105 5z m-22 -445 c3 -97 5 -107 27 -125 32 -26 67 -24 96 6 23 22 25 31 25 125 l0 100 705 0 705 0 0 -90 c0 -103 15 -146 56 -156 34 -9 72 10 84 42 6 14 10 66 10 115 l0 89 153 0 c225 0 286 -22 341 -121 25 -44 26 -55 26 -188 l0 -141 -157 -1 c-87 0 -527 0 -978 0 -451 0 -999 1 -1217 1 l-398 0 0 137 c0 158 13 198 82 258 53 45 92 53 280 54 l156 1 4 -106z m1976 -494 l252 0 -2 -783 -3 -784 -30 -43 c-30 -44 -81 -82 -125 -93 -14 -4 -563 -7 -1220 -7 l-1195 0 -55 28 c-43 22 -62 39 -87 82 l-33 54 0 773 0 773 373 2 c204 2 710 2 1122 1 413 -2 864 -3 1003 -3z" />
                      <path d="M1330 2585 l0 -205 220 0 220 0 0 205 0 205 -220 0 -220 0 0 -205z" />
                      <path d="M2148 2753 c-1 -21 -2 -113 -3 -205 l0 -168 218 0 217 0 0 205 0 205 -215 0 -215 0 -2 -37z" />
                      <path d="M2990 2585 l0 -205 220 0 220 0 0 205 0 205 -220 0 -220 0 0 -205z" />
                      <path d="M1330 1845 l0 -205 218 0 217 0 2 205 3 205 -220 0 -220 0 0 -205z" />
                      <path d="M2144 2037 c-2 -7 -3 -98 -2 -202 l3 -190 218 -3 217 -2 0 205 0 205 -215 0 c-166 0 -217 -3 -221 -13z" />
                      <path d="M2990 1845 l0 -205 220 0 220 0 0 205 0 205 -220 0 -220 0 0 -205z" />
                      <path d="M4000 2353 c0 -1012 -1 -1070 -19 -1108 -23 -51 -89 -111 -138 -124 -26 -8 -448 -11 -1323 -11 l-1284 0 116 -70 117 -70 1203 2 1203 3 57 28 c74 36 144 107 177 177 l26 55 3 982 2 982 -65 111 c-36 60 -68 110 -70 110 -3 0 -5 -480 -5 -1067z" />
                    </g>
                  </svg>
                  {quiz.createAt.split('T')[0]}
                </span>
                <span>
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="500.000000pt"
                    height="500.000000pt"
                    viewBox="0 0 500.000000 500.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M2694 3929 c-82 -12 -193 -51 -273 -95 -82 -46 -225 -187 -272 -269 -181 -314 -132 -686 124 -938 33 -32 55 -62 51 -66 -5 -4 -34 -18 -64 -30 -212 -88 -357 -187 -515 -353 -160 -167 -272 -359 -342 -583 -60 -196 -43 -315 61 -423 67 -71 123 -94 246 -101 58 -3 593 -4 1190 -1 l1085 5 55 26 c76 37 127 91 167 176 27 58 33 84 33 137 0 62 -2 67 -38 106 -32 32 -46 40 -75 40 -81 0 -117 -43 -117 -140 0 -57 -3 -65 -34 -96 l-34 -34 -1141 2 -1141 3 -32 33 c-29 29 -33 38 -32 85 1 64 50 211 104 315 158 305 403 516 718 622 298 100 658 72 939 -72 190 -97 316 -206 472 -409 36 -46 82 -63 124 -45 44 18 77 61 77 100 0 82 -212 321 -403 456 -61 43 -194 113 -326 171 l-34 15 53 50 c186 176 273 438 231 695 -23 139 -107 296 -218 406 -158 158 -421 245 -639 212z m316 -259 c73 -30 96 -45 161 -110 115 -113 169 -241 169 -402 0 -179 -124 -377 -290 -463 -113 -58 -284 -73 -406 -36 -198 60 -340 229 -374 446 -34 215 93 453 292 549 101 48 136 55 258 52 93 -2 115 -6 190 -36z" />
                    </g>
                  </svg>
                  Create by {quiz.creator.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
