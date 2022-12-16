import Image from "next/image"
import Dialog from "../components/Dialog"
import { createGlobalStyle } from 'styled-components'
import { useContext } from "react";
import { Context } from "../context/layout";

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
`;

export default function Home() {
  const { isActiveDialog } = useContext(Context)
  const { handleOpenDialog } = useContext(Context)
  const { dataQuiz } = useContext(Context);

  return (
    <>
      <GlobalStyles isActiveDialog={isActiveDialog} dataQuiz={dataQuiz} />
      <div className="field-quizzes">
        <div className="position">
          <div className="add-button quiz" onClick={handleOpenDialog}>
            <Image
              src='https://i.postimg.cc/ZqDQySGV/vector-add.png'
              alt="vector add"
              width={55}
              height={55}
              loading="eager"
              priority
            />
            <span>Adicionar Quiz</span>
          </div>
        </div>
        <Dialog/>
      </div>
    </>
  )
}