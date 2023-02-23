import axios from 'axios';
import Router from 'next/router';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';

interface IProps {
  isActiveSearchField: boolean;
  resultData: any;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.isActiveSearchField &&
    `body {
      overflow: hidden;
    }`}
  ${(props) =>
    props.resultData?.length > 8 &&
    `.search-field {
      overflow-y: scroll;
    }`}
`;

export default function Search({ handleCloseSearch, isActiveSearchField }: any) {
  const inputSearch = useRef<any>(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoadingSearch(true);

    try {
      const resultSearch = await axios.post('/api/quiz/search', {
        search: inputSearch.current.value,
      });
      setResultData(resultSearch.data.quiz);
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      console.log(error);
    }
    setIsLoadingSearch(false);
  }

  const [nothingFound, setNothingFound] = useState<boolean>(false);

  useEffect(() => {
    console.log(resultData);
    if (resultData == '') {
      console.log('oiioi');
      setNothingFound(true);
    }
    else setNothingFound(false);
  }, [resultData]);

  return (
    <>
      <GlobalStyles resultData={resultData} isActiveSearchField={isActiveSearchField} />
      <div className="search-field">
        <div className="header">
          <form onSubmit={handleSubmit}>
            <div>
              <input ref={inputSearch} type="search" name="search" placeholder="Pesquisar" />
              <button type="submit">
                <svg
                  id="btn-search"
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 0 200.000000 200.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M760 1609 c-105 -21 -221 -104 -285 -204 -116 -182 -89 -415 65 -566 131 -128 313 -166 489 -102 l74 26 181 -187 c159 -165 185 -188 213 -188 18 -1 43 6 57 16 33 21 59 72 52 100 -5 20 -96 119 -286 311 l-79 80 29 60 c104 210 36 456 -163 588 -96 64 -231 90 -347 66z m227 -143 c119 -56 193 -159 201 -282 19 -299 -325 -468 -547 -268 -184 166 -126 474 107 559 63 23 179 19 239 -9z" />
                  </g>
                </svg>
              </button>
            </div>
            <svg
              onClick={handleCloseSearch}
              id="btn-delete"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 800.000000 800.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M1085 7600 c-170 -27 -358 -124 -472 -242 -268 -279 -309 -718 -97 -1045 24 -38 435 -456 1166 -1188 620 -622 1128 -1137 1128 -1145 0 -8 -510 -526 -1134 -1150 -974 -975 -1139 -1145 -1175 -1206 -232 -397 -120 -889 256 -1135 70 -46 177 -92 252 -110 148 -36 324 -29 467 19 194 65 125 2 1379 1254 627 626 1145 1138 1150 1138 6 0 505 -495 1110 -1101 605 -605 1127 -1122 1161 -1149 83 -67 192 -124 299 -155 78 -24 107 -27 225 -27 115 1 148 5 225 27 280 82 487 285 576 565 21 67 24 93 23 240 0 158 -2 169 -32 260 -66 200 -14 143 -1264 1393 -620 622 -1128 1135 -1128 1141 0 6 502 513 1116 1126 613 613 1135 1142 1159 1175 54 76 96 160 126 255 21 66 24 94 24 235 0 140 -3 169 -23 235 -90 284 -303 493 -585 571 -115 32 -317 33 -429 1 -96 -27 -172 -60 -245 -108 -38 -24 -457 -435 -1195 -1172 -1007 -1006 -1139 -1134 -1153 -1122 -9 7 -517 514 -1128 1125 -846 845 -1129 1122 -1184 1158 -89 59 -177 99 -265 121 -84 20 -253 28 -333 16z" />
              </g>
            </svg>
          </form>
        </div>
        {isLoadingSearch ? (
          <div className="field-loader-search">
            <div className="field">
              <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
              </div>
            </div>
          </div>
        ) : nothingFound ? (
          <div className="nothing-found">
            <h1>Nenhum resultado encontrado para &ldquo;{inputSearch.current.value}&rdquo;</h1>
          </div>
        ) : (
          <div className="field-quizzes">
            <div className="position">
              {resultData &&
                resultData.map((item: any) => {
                  return (
                    <div
                      onClick={() => [Router.push(item._id), handleCloseSearch()]}
                      key={item._id}
                      className="quiz card"
                    >
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
          </div>
        )}
      </div>
    </>
  );
}
