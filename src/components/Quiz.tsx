import { useContext, useEffect, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Context } from '../context/layout';

interface IProps {
  data: any;
  isActivePage: number;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.data.pages[props.isActivePage][0].data.questions.length >= 5 &&
    `.quiz-page > div {
      overflow-y: scroll;
    }`}
  ${(props) =>
    props.data.pages[props.isActivePage][0].data.statement.length >= 400 &&
    props.data.pages[props.isActivePage][0].data.questions.length >= 3 &&
    `.quiz-page > div {
      overflow-y: scroll;
    }`}
`;

export default function Quiz({ data, handleCloseQuiz }: any) {
  const { isActiveQuiz } = useContext(Context);

  useEffect(() => {
    if (isActiveQuiz) window.scrollTo(0, 0);
  }, [isActiveQuiz]);

  const [isCompletedQuiz, setIsCompletedQuiz] = useState<boolean>(false);
  const [resultQuiz, setResultQuiz] = useState<number>();

  const [isActivePage, setIsActivePage] = useState<number>(0);
  const [indexQuestionsPageQuiz, setIndexQuestionsPageQuiz] = useState<number>(1);

  useEffect(() => {
    setResultQuiz(
      (questionAnswer.slice(1, questionAnswer.length).filter((item: any) => item.response === true).length /
        data.pages.length) *
        100
    );
  }, [isCompletedQuiz]);

  function handleNextPage() {
    if (isActivePage === data.pages.length - 1) {
      return setIsCompletedQuiz(true);
    }
    return setIsActivePage(isActivePage + 1);
  }

  const progressBar = useRef<any>(null);

  function handleProgressBar() {
    if (isActivePage !== 0) setIndexQuestionsPageQuiz(0);
    progressBar.current.classList.remove('active');
    setTimeout(() => {
      progressBar.current.classList.add('active');
      setTimeout(() => {
        handleNextPage();
      }, 60 * 1000); //1 min
    }, 100);
  }

  useEffect(() => {
    handleProgressBar();
  }, [isActivePage]);

  const [questionAnswer, setQuestionAnswer] = useState<Array<Object>>([{}]);
  const [responseQuiz, setResponseQuiz] = useState<string>();
  const [questionClicked, setQuestionClicked] = useState<number>();

  function handleQuestionAnswer(id: number) {
    setQuestionClicked(id);
    let newAnswer = false;
    if (id === data.pages[isActivePage][0].data.response) [(newAnswer = true), setResponseQuiz('correct')];
    else setResponseQuiz('wrong');
    setQuestionAnswer((prevData) => [...prevData, { response: newAnswer }]);
    setTimeout(() => {
      setResponseQuiz('');
      return handleNextPage();
    }, 500);
  }

  return (
    <>
      <GlobalStyles data={data} isActivePage={isActivePage} />
      <div className="quiz-page">
        <div>
          {!isCompletedQuiz ? (
            <>
              <div className="header">
                <div ref={progressBar} className="progress-bar" />
                <span>
                  {isActivePage + 1} of {data.pages.length}
                </span>
              </div>
              <div className="position field-quiz-page">
                <h1>{data.pages[isActivePage][0].data.statement}</h1>
                <div className="questions-field">
                  {data.pages[isActivePage][0].data.questions
                    .slice(indexQuestionsPageQuiz, data.pages[isActivePage][0].data.questions.length)
                    .map((item: any) => {
                      return (
                        <span
                          onClick={() => handleQuestionAnswer(item.id)}
                          key={item.id}
                          className={`${questionClicked === item.id && responseQuiz}`}
                        >
                          {item.questions}
                        </span>
                      );
                    })}
                </div>
                <div>
                  <button onClick={handleNextPage}>Next</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="position result-quiz">
                <h1>Result: {resultQuiz}%</h1>
                <span>
                  Selected{' '}
                  {questionAnswer.slice(1, questionAnswer.length).filter((item: any) => item.response === true).length}{' '}
                  correct options out of {data.pages.length} questions.
                </span>
                <button onClick={handleCloseQuiz}>Finished</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
