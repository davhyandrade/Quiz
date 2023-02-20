import { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import { createGlobalStyle } from 'styled-components';

interface IProps {
  dataQuiz: any;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    window.innerWidth < 800 &&
    props.dataQuiz.pages?.length > 2 &&
    `.field-page {
      overflow-x: scroll;
    }
    
    .field-page > div {
      margin-bottom: 10px;
    }`}
`;

export default function dialogEdit({ idQuiz }: any) {
  const { inputDescriptionQuiz, inputTitleQuiz, inputQuestionsQuiz, inputStatementQuiz, inputImageQuiz }: any =
    useContext(Context);

  const {
    handleCloseDialog,
    dialogEdit,
    setDataQuiz,
    dataQuiz,
    setIsLoadingModal,
    isLoadingModal,
    fetchData,
    user,
  }: any = useContext(Context);

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoadingModal(true);

    try {
      if (!previewSource) {
        setIsLoadingModal(false);
        return toast.error('Realize o Upload de uma Imagem!!', {
          theme: 'colored',
        });
      }

      if (dataQuiz.length === 1) {
        setIsLoadingModal(false);
        return toast.error('Crie as páginas do Quiz!!', {
          theme: 'colored',
        });
      }

      let data = dataQuiz.map((item: any) => item.data).slice(1, dataQuiz.map((item: any) => item.data).length);
      let i = 0;

      while (i <= data.length - 1) {
        if (typeof data[i].statement === 'undefined' || data[i].statement === '') {
          setIsLoadingModal(false);
          return toast.error('Alguma página está sem o enunciado!!', {
            theme: 'colored',
          });
        }

        if (typeof data[i].questions === 'undefined' || data[i].questions === '') {
          setIsLoadingModal(false);
          return toast.error('Alguma página está sem questão!!', {
            theme: 'colored',
          });
        }

        if (typeof data[i].response === 'undefined' || data[i].response === '') {
          setIsLoadingModal(false);
          return toast.error('Alguma página está sem resposta!!', {
            theme: 'colored',
          });
        }
        i++;
      }

      const imageURL = await axios.post('api/image.upload', {
        imageBase64: previewSource,
        preset: 'quiz-images-uploads',
      });

      const { token }: any = parseCookies();

      const createQuiz = await axios.post(
        'api/quiz',
        {
          title: inputTitleQuiz.current.value,
          description: inputDescriptionQuiz.current.value,
          image: imageURL.data.uploadResponse.url,
          creator: user.name,
          pages: dataQuiz.slice(1, dataQuiz.length),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      handleCloseDialog();
      setIsLoadingModal(false);
      fetchData();
      toast.success(createQuiz.data.msg, {
        theme: 'colored',
      });
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      setIsLoadingModal(false);
      console.log(error);
    }
  }

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      handleCloseDialog();
    }
  }

  const { setPreviewSource, previewSource } = useContext(Context);

  function previewFile(file: any) {
    const reader: any = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const [questions, setQuestions] = useState<any>();
  const [id, setId] = useState<number>(1);

  function handleQuestions(event: any) {
    event.preventDefault();

    if (inputQuestionsQuiz.current.value === '') return;

    let i = id;
    i++;
    setId(i);

    const questionObject = new Object({
      [inputQuestionsQuiz.current.name]: inputQuestionsQuiz.current.value,
      id,
    });

    setQuestions((prevData: any) => [...prevData, questionObject]);

    inputQuestionsQuiz.current.value = '';
  }

  useEffect(() => {
    handleUpdatePageQuiz();
  }, [questions]);

  function handleDeleteQuestion(id: number) {
    setQuestions(questions.filter((value: any) => value.id !== id));
    questions.map((element: any) => {
      if (element.id >= id) element.id -= 1;
    });
    setId(Math.max(...questions.slice(1, questions.length).map((item: any) => item.id)) + 1);
  }

  const [indexQuestionsPage, setIndexQuestionsPage] = useState<number>(1);

  const [isActivePageQuiz, setIsActivePageQuiz] = useState<number>(0);

  useEffect(() => {
    if (dataQuiz[isActivePageQuiz - 1]?.data?.questions) {
      if (typeof questions === 'string') {
        setId(1);
      } else {
        setId(Math.max(...questions.slice(1, questions.length).map((item: any) => item.id)) + 1);
      }
    }
  }, [isActivePageQuiz]);

  function handlePageQuiz(id: number) {
    setIsActivePageQuiz(id - 1);
    inputStatementQuiz.current.value = dataQuiz.pages[id][0]?.data?.statement;
    inputQuestionsQuiz.current.value = '';
    setQuestions(dataQuiz.pages[id][0]?.data?.questions);
    setResponseQuiz(dataQuiz.pages[id][0]?.data?.response);

    if (id > 1) {
      setIndexQuestionsPage(0);
    } else {
      setIndexQuestionsPage(1);
    }
  }

  function handleUpdatePageQuiz() {
    const updateDataQuiz = {
      [inputStatementQuiz.current?.name]: inputStatementQuiz.current?.value,
      questions,
      response: responseQuiz,
    };

    const updatePageQuiz: any = dataQuiz;

    if (typeof updatePageQuiz.pages !== 'undefined') updatePageQuiz.pages[isActivePageQuiz][0].data = updateDataQuiz;

    setDataQuiz(updatePageQuiz);
  }

  const { setIdDataQuiz, idDataQuiz } = useContext(Context);

  function createPageQuiz(event: any) {
    event.preventDefault();

    let i = idDataQuiz;
    i++;
    setIdDataQuiz(i);

    const Page = 'Page ' + idDataQuiz;

    const pageQuiz = new Object({
      id: idDataQuiz,
      page: Page,
      data: {
        statement: '',
        questions: '',
        response: '',
      },
    });

    setDataQuiz((prevData: Array<object>) => [...prevData, pageQuiz]);
  }

  function handleDeletePageQuiz(id: number) {
    setDataQuiz(dataQuiz.filter((value: any) => value.id !== id));
    dataQuiz.map((element: any) => {
      if (element.id >= id) [(element.id -= 1), (element.page = `Page ${element.id}`)];
    });
    setIdDataQuiz(Math.max(...dataQuiz.slice(1, dataQuiz.length).map((item: any) => item.id)) + 1);

    if (dataQuiz.length >= 3) {
      setTimeout(() => {
        inputStatementQuiz.current.value = '';
      }, 0);
    }
  }

  const { inputResponseQuiz }: any = useContext(Context);
  const [responseQuiz, setResponseQuiz] = useState<number>();

  useEffect(() => {
    handleUpdatePageQuiz();
  }, [responseQuiz]);

  function handleInputRadio(id: number) {
    setResponseQuiz(id);
  }

  async function fetchQuiz() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const data = await axios.get(`/api/quiz/${idQuiz}`);
        setDataQuiz(data.data.quiz);
        setQuestions(data.data.quiz.pages[isActivePageQuiz][0].data.questions);
        setId(
          data.data.quiz.pages[isActivePageQuiz][0].data.questions[
            data.data.quiz.pages[isActivePageQuiz][0].data.questions.length - 1
          ].id + 1
        );
        setResponseQuiz(data.data.quiz.pages[isActivePageQuiz][0].data.response);
        setPreviewSource(data.data.quiz.image);
      } catch (error: any) {
        handleCloseDialog();
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (isLoadingModal) fetchQuiz();
    setIsLoadingModal(false);
  }, [isLoadingModal]);

  const [firstClickButtonDeleteQuiz, setFirstClickButtonDeleteQuiz] = useState<boolean>(false);

  async function handleDeleteQuiz() {
    if (!firstClickButtonDeleteQuiz) return setFirstClickButtonDeleteQuiz(true);
    setIsLoadingModal(true);
    try {
      const data = await axios.delete(`/api/quiz/${idQuiz}`);
      toast.error(data.data.msg, {
        theme: 'colored',
      });
      setFirstClickButtonDeleteQuiz(false);
    } catch (error: any) {
      handleCloseDialog();
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      console.log(error);
    }
    setIsLoadingModal(false);
  }

  return (
    <>
      <GlobalStyles dataQuiz={dataQuiz} />
      <dialog onKeyDown={handleKeyPressDialog} ref={dialogEdit}>
        <div className="position">
          <form onSubmit={handleForm}>
            <h1>Editar Quiz</h1>
            <div>
              <div>
                <div className="field-inputs">
                  <input
                    ref={inputTitleQuiz}
                    defaultValue={dataQuiz.title}
                    name="title"
                    id="title-quiz"
                    type="text"
                    placeholder="titulo"
                    required
                  />
                  <label htmlFor="title-quiz">Título</label>
                </div>
                <div className="field-inputs">
                  <input
                    ref={inputDescriptionQuiz}
                    defaultValue={dataQuiz.description}
                    name="description"
                    id="description-quiz"
                    type="text"
                    placeholder="descricao"
                    required
                  />
                  <label htmlFor="description-quiz">Descrição</label>
                </div>
              </div>
              <div className="field-inputs field-upload">
                {previewSource ? (
                  <div className="field-image">
                    <img src={previewSource} alt="fasdfasdf" />
                  </div>
                ) : (
                  <span>Faça o upload da imagem para o Background do Quiz</span>
                )}
                <input
                  onChange={() => previewFile(inputImageQuiz.current.files[0])}
                  ref={inputImageQuiz}
                  type="file"
                  name="upload"
                  id="input-file"
                />
                <label htmlFor="input-file">Alterar Arquivo</label>
              </div>
            </div>
            <hr />
            <div className="field-page">
              <div>
                <button onClick={createPageQuiz}>Add Page</button>
                {dataQuiz.pages &&
                  dataQuiz.pages.map((item: any) => {
                    return (
                      <span
                        onClick={() => handlePageQuiz(item[0].id)}
                        className={`${isActivePageQuiz + 1 == item[0].id && 'active'}`}
                        key={item[0].id}
                      >
                        {item[0].page}
                        <svg
                          onClick={() => handleDeletePageQuiz(item[0].id)}
                          id="btn-delete"
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="10px"
                          height="10px"
                          viewBox="0 0 800.000000 800.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                          >
                            <path d="M1085 7600 c-170 -27 -358 -124 -472 -242 -268 -279 -309 -718 -97 -1045 24 -38 435 -456 1166 -1188 620 -622 1128 -1137 1128 -1145 0 -8 -510 -526 -1134 -1150 -974 -975 -1139 -1145 -1175 -1206 -232 -397 -120 -889 256 -1135 70 -46 177 -92 252 -110 148 -36 324 -29 467 19 194 65 125 2 1379 1254 627 626 1145 1138 1150 1138 6 0 505 -495 1110 -1101 605 -605 1127 -1122 1161 -1149 83 -67 192 -124 299 -155 78 -24 107 -27 225 -27 115 1 148 5 225 27 280 82 487 285 576 565 21 67 24 93 23 240 0 158 -2 169 -32 260 -66 200 -14 143 -1264 1393 -620 622 -1128 1135 -1128 1141 0 6 502 513 1116 1126 613 613 1135 1142 1159 1175 54 76 96 160 126 255 21 66 24 94 24 235 0 140 -3 169 -23 235 -90 284 -303 493 -585 571 -115 32 -317 33 -429 1 -96 -27 -172 -60 -245 -108 -38 -24 -457 -435 -1195 -1172 -1007 -1006 -1139 -1134 -1153 -1122 -9 7 -517 514 -1128 1125 -846 845 -1129 1122 -1184 1158 -89 59 -177 99 -265 121 -84 20 -253 28 -333 16z" />
                          </g>
                        </svg>
                      </span>
                    );
                  })}
              </div>
            </div>
            {dataQuiz.pages && (
              <>
                <div className="field-inputs">
                  <input
                    onChange={handleUpdatePageQuiz}
                    ref={inputStatementQuiz}
                    defaultValue={dataQuiz.pages[isActivePageQuiz][0].data.statement}
                    name="statement"
                    id="statement-quiz"
                    type="text"
                    placeholder="enunciado"
                    required
                  />
                  <label htmlFor="statement-quiz">Enunciado</label>
                </div>
                <div className="field-inputs">
                  <div>
                    <input
                      ref={inputQuestionsQuiz}
                      name="questions"
                      id="questions-quiz"
                      type="text"
                      placeholder="questoes"
                    />
                    <label htmlFor="questions-quiz">Questões</label>
                    <button id="btn-add-quiz" onClick={handleQuestions}>
                      Add
                    </button>
                  </div>
                  {dataQuiz.pages[isActivePageQuiz][0]?.data?.questions?.length >= 1 &&
                    dataQuiz.pages[isActivePageQuiz][0]?.data?.questions
                      .slice(indexQuestionsPage, dataQuiz.pages[isActivePageQuiz][0]?.data?.questions.length)
                      .map((item: any) => {
                        return (
                          <div key={item.id} className="field-text">
                            <span>{item.id + ' - ' + item.questions}</span>
                            <input
                              ref={inputResponseQuiz}
                              onChange={() => handleInputRadio(item.id)}
                              type="radio"
                              name="input-radio"
                              key={item.id}
                              checked={responseQuiz === item.id}
                            />
                            <svg
                              onClick={() => handleDeleteQuestion(item.id)}
                              id="btn-delete"
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 800.000000 800.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g
                                transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)"
                                fill="#000000"
                                stroke="none"
                              >
                                <path d="M1085 7600 c-170 -27 -358 -124 -472 -242 -268 -279 -309 -718 -97 -1045 24 -38 435 -456 1166 -1188 620 -622 1128 -1137 1128 -1145 0 -8 -510 -526 -1134 -1150 -974 -975 -1139 -1145 -1175 -1206 -232 -397 -120 -889 256 -1135 70 -46 177 -92 252 -110 148 -36 324 -29 467 19 194 65 125 2 1379 1254 627 626 1145 1138 1150 1138 6 0 505 -495 1110 -1101 605 -605 1127 -1122 1161 -1149 83 -67 192 -124 299 -155 78 -24 107 -27 225 -27 115 1 148 5 225 27 280 82 487 285 576 565 21 67 24 93 23 240 0 158 -2 169 -32 260 -66 200 -14 143 -1264 1393 -620 622 -1128 1135 -1128 1141 0 6 502 513 1116 1126 613 613 1135 1142 1159 1175 54 76 96 160 126 255 21 66 24 94 24 235 0 140 -3 169 -23 235 -90 284 -303 493 -585 571 -115 32 -317 33 -429 1 -96 -27 -172 -60 -245 -108 -38 -24 -457 -435 -1195 -1172 -1007 -1006 -1139 -1134 -1153 -1122 -9 7 -517 514 -1128 1125 -846 845 -1129 1122 -1184 1158 -89 59 -177 99 -265 121 -84 20 -253 28 -333 16z" />
                              </g>
                            </svg>
                          </div>
                        );
                      })}
                </div>
              </>
            )}
            <div className="div-btns">
              <input
                onClick={handleDeleteQuiz}
                id="btn-delete-quiz"
                type="button"
                value={`${
                  isLoadingModal ? 'Deleting...' : !firstClickButtonDeleteQuiz ? 'Delete' : 'Press again to confirm'
                }`}
              />
              <input type="submit" value={`${isLoadingModal ? 'Saving...' : 'Save'}`} />
            </div>
            <input
              onClick={handleCloseDialog}
              id="btn-close"
              type="image"
              src="https://i.postimg.cc/prSVPYvN/btn-close.png"
              alt="button close"
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
