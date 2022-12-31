import Image from 'next/image';
import Dialog from '../components/Dialog';
import { createGlobalStyle } from 'styled-components';
import { useContext } from 'react';
import { Context } from '../context/layout';

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
    props.dataQuiz.length === 1 &&
    `dialog .position form .field-page {
      margin-bottom: 15px;
    }`}
`;

export default function Home() {
  const { isActiveDialog } = useContext(Context);
  const { handleOpenDialog } = useContext(Context);
  const { dataQuiz } = useContext(Context);
  const { data } = useContext(Context);

  return (
    <>
      <GlobalStyles isActiveDialog={isActiveDialog} dataQuiz={dataQuiz} />
      <div className="field-quizzes">
        <div className="position">
          <div className="add-button quiz" onClick={handleOpenDialog}>
            <Image
              src="https://i.postimg.cc/ZqDQySGV/vector-add.png"
              alt="vector add"
              width={55}
              height={55}
              loading="eager"
              priority
            />
            <span>Adicionar Quiz</span>
          </div>
          {data &&
            data.map((item: any) => {
              return (
                <div key={item._id} className="quiz card">
                  <Image src={item.image} alt="quiz image" fill loading="eager" priority />
                  <div className="info-card">
                    <div className="position">
                      <h1>{item.title}</h1>
                      <span>{item.description}</span>
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
