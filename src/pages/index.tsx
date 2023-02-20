import Image from 'next/image';
import Dialog from '../components/Dialog';
import { createGlobalStyle } from 'styled-components';
import { useContext, useEffect } from 'react';
import { Context } from '../context/layout';
import Router from 'next/router';

interface IProps {
  isActiveDialog: boolean | undefined;
  dataQuiz: any;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.isActiveDialog &&
    `body {
      overflow: hidden;
    }`}

  ${(props) =>
    props.dataQuiz.length > 4 &&
    `.field-page {
      overflow-x: scroll;
    }
    
    .field-page > div {
      margin-bottom: 10px;
    }`}

  ${(props) =>
    window.innerWidth < 800 && props.dataQuiz.length > 2 &&
    `.field-page {
      overflow-x: scroll;
    }
    
    .field-page > div {
      margin-bottom: 10px;
    }`}

  ${(props) =>
    props.dataQuiz.length === 1 &&
    `dialog .position form .field-page {
      margin-bottom: 15px;
    }`}
`;

export default function Home() {
  const { isActiveDialog, handleOpenDialog, dataQuiz, data, fetchData, isAuth } = useContext(Context);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <GlobalStyles isActiveDialog={isActiveDialog} dataQuiz={dataQuiz} />
      <div className="field-quizzes">
        <div className="position">
          {isAuth && (
            <div className="add-button quiz" onClick={handleOpenDialog}>
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="55px"
                height="55px"
                viewBox="0 0 1080.000000 1080.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path
                    d="M5080 10719 c-584 -32 -1272 -195 -1780 -421 -530 -237 -923 -478 -1330 -819 -153 -128 -439 -406 -569 -554 -776 -881 -1227 -1944 -1327 -3125 -18 -216 -15 -737 5 -925 35 -321 79 -569 152 -850 58 -227 164 -541 239 -710 5 -11 32 -73 60 -137 28 -64 65 -145 84 -180 110 -209 145 -273 196 -358 403 -673 927 -1229 1595 -1692 291 -202 794 -463 1095 -570 446 -158 668 -218 1061 -282 243 -41 442 -57 754 -63 627 -11 1186 72 1774 266 680 224 1336 600 1856 1065 804 718 1345 1587 1625 2611 190 695 236 1423 134 2160 -100 729 -363 1449 -762 2085 -329 526 -768 1011 -1260 1390 -429 330 -845 564 -1392 780 -232 92 -750 230 -990 264 -25 4 -85 13 -135 21 -322 49 -703 65 -1085 44z m550 -429 c492 -25 918 -104 1355 -253 258 -88 358 -131 640 -273 398 -200 731 -427 1065 -726 852 -762 1429 -1836 1585 -2953 37 -262 45 -393 45 -701 0 -304 -11 -468 -50 -744 -55 -391 -196 -875 -365 -1250 -302 -673 -719 -1237 -1270 -1719 -723 -631 -1610 -1034 -2570 -1166 -167 -23 -482 -45 -655 -45 -331 0 -828 55 -1080 120 -19 5 -66 16 -105 25 -535 129 -1055 359 -1540 681 -1006 668 -1734 1689 -2037 2854 -22 85 -46 187 -53 225 -60 312 -80 459 -95 706 -71 1177 268 2312 973 3254 274 366 621 714 982 985 680 509 1464 831 2305 944 127 17 344 36 460 39 186 6 242 6 410 -3z"
                  />
                  <path
                    d="M4835 7898 c-49 -18 -84 -47 -105 -88 -19 -38 -20 -62 -20 -873 0 -679 -2 -837 -13 -846 -9 -7 -264 -11 -858 -13 l-844 -3 -38 -29 c-76 -58 -72 -23 -72 -667 l0 -576 27 -39 c15 -22 42 -48 60 -59 32 -19 56 -20 872 -23 592 -2 843 -6 853 -13 11 -9 13 -166 13 -848 l0 -837 27 -41 c14 -23 43 -51 64 -62 37 -21 43 -21 617 -19 l579 3 36 28 c77 58 71 -7 77 937 l5 845 845 5 c912 5 874 3 921 56 50 57 49 44 49 646 0 631 3 601 -73 662 l-39 31 -851 5 -852 5 -5 845 c-5 773 -6 848 -22 876 -23 43 -71 81 -116 94 -51 14 -1096 12 -1137 -2z m905 -1208 c5 -922 2 -872 62 -926 56 -51 16 -49 912 -52 462 -1 841 -4 843 -6 3 -3 6 -553 3 -643 0 -10 -187 -13 -842 -15 -822 -3 -844 -3 -877 -23 -19 -11 -48 -37 -65 -58 l-31 -39 -3 -846 c-2 -655 -5 -848 -15 -854 -6 -4 -153 -8 -325 -8 -242 0 -314 3 -317 13 -3 6 -6 386 -8 842 l-2 830 -22 42 c-21 39 -54 69 -98 89 -11 5 -387 11 -860 14 l-840 5 0 325 0 325 840 5 840 5 47 27 c33 20 53 41 70 75 l23 48 3 825 c1 454 4 831 7 838 4 10 74 12 327 10 l323 -3 5 -845z"
                  />
                </g>
              </svg>
              <span>Adicionar Quiz</span>
            </div>
          )}
          {data &&
            data.map((item: any) => {
              return (
                <div onClick={() => Router.push(item._id)} key={item._id} className="quiz card">
                  <Image src={item.image} alt="quiz image" fill loading="eager" priority />
                  <div className="info-card">
                    <div className="position">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                    </div>  
                  </div>
                </div>
              );
            })}
        </div>
        <Dialog />
      </div>
    </>
  );
}
