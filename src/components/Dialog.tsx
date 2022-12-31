import { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Dialog() {
  const { handleCloseDialog } = useContext(Context);
  const { inputDescriptionQuiz }: any = useContext(Context);
  const { inputTitleQuiz }: any = useContext(Context);
  const { inputQuestionsQuiz }: any = useContext(Context);
  const { inputStatementQuiz }: any = useContext(Context);
  const { inputImageQuiz }: any = useContext(Context);
  const { dialog } = useContext(Context);

  const { setDataQuiz } = useContext(Context);
  const { dataQuiz } = useContext(Context);

  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

  const { fetchData } = useContext(Context);

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

      const imageURL = await axios.post('api/image.upload', {
        imageBase64: previewSource,
        preset: 'quiz-images-uploads',
      });

      const createQuiz = await axios.post('api/quiz', {
        title: inputTitleQuiz.current.value,
        description: inputDescriptionQuiz.current.value,
        image: imageURL.data.uploadResponse.url,
        pages: dataQuiz.slice(1, dataQuiz.length),
      });
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
      console.log(error);
    }
  }

  const { setIsActiveDialog } = useContext(Context);

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      setIsActiveDialog(false);
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

  const [questions, setQuestions] = useState<any>([{}]);
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

    setQuestions((prevData: Array<object>) => [...prevData, questionObject]);

    inputQuestionsQuiz.current.value = '';
  }

  function handleDeleteQuestion(id: number) {
    setQuestions(questions.filter((value: any) => value.id !== id));
    questions.map((element: any) => {
      if (element.id >= id) element.id -= 1;
    });
    setId(Math.max(...questions.slice(1, questions.length).map((item: any) => item.id)) + 1);
  }

  const [indexQuestionsPage, setIndexQuestionsPage] = useState<number>(1);

  const [isActivePageQuiz, setIsActivePageQuiz] = useState<number>(1);

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
    setIsActivePageQuiz(id);
    inputStatementQuiz.current.value = dataQuiz[id]?.data?.statement;
    inputQuestionsQuiz.current.value = '';
    setQuestions(dataQuiz[id]?.data?.questions);
    setResponseQuiz(dataQuiz[id]?.data?.response);

    if (id > 1) {
      setIndexQuestionsPage(0);
    } else {
      setIndexQuestionsPage(1);
    }
  }

  useEffect(() => {
    handleUpdatePageQuiz();
  }, [questions]);

  function handleUpdatePageQuiz() {
    const updateDataQuiz = {
      [inputStatementQuiz.current?.name]: inputStatementQuiz.current?.value,
      questions,
      response: responseQuiz,
    };

    const updatePageQuiz = [...dataQuiz];

    if (typeof updatePageQuiz[isActivePageQuiz] !== 'undefined') updatePageQuiz[isActivePageQuiz].data = updateDataQuiz;

    setDataQuiz(updatePageQuiz);
  }

  const [idDataQuiz, setIdDataQuiz] = useState<number>(1);

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

  return (
    <dialog onKeyDown={handleKeyPressDialog} ref={dialog}>
      <div className="position">
        <form onSubmit={handleForm}>
          <h1>Adicionar Quiz</h1>
          <div>
            <div>
              <div className="field-inputs">
                <input ref={inputTitleQuiz} name="title" id="title-quiz" type="text" placeholder="titulo" required />
                <label htmlFor="title-quiz">Título</label>
              </div>
              <div className="field-inputs">
                <input
                  ref={inputDescriptionQuiz}
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
              <label htmlFor="input-file">Escolher Arquivo</label>
            </div>
          </div>
          <hr />
          <div className="field-page">
            <div>
              <button onClick={createPageQuiz}>Add Page</button>
              {dataQuiz &&
                dataQuiz.slice(1, dataQuiz.length).map((item: any) => {
                  return (
                    <span
                      onClick={() => handlePageQuiz(item.id)}
                      className={`${isActivePageQuiz == item.id && 'active'}`}
                      key={item.id}
                    >
                      {item.page}
                      <Image
                        onClick={() => handleDeletePageQuiz(item.id)}
                        id="btn-delete"
                        src="https://i.postimg.cc/59r7rSZ7/vector-close.png"
                        alt="button delete"
                        width={10}
                        height={10}
                      />
                    </span>
                  );
                })}
            </div>
          </div>
          {dataQuiz.length > 1 && (
            <>
              <div className="field-inputs">
                <input
                  onChange={handleUpdatePageQuiz}
                  ref={inputStatementQuiz}
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
                {dataQuiz[isActivePageQuiz]?.data?.questions?.length >= 1 &&
                  dataQuiz[isActivePageQuiz]?.data?.questions
                    .slice(indexQuestionsPage, questions.length)
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
                            checked={dataQuiz[isActivePageQuiz]?.data?.response === item.id}
                          />
                          <Image
                            onClick={() => handleDeleteQuestion(item.id)}
                            id="btn-delete"
                            src="https://i.postimg.cc/59r7rSZ7/vector-close.png"
                            alt="button delete"
                            width={13}
                            height={13}
                          />
                        </div>
                      );
                    })}
              </div>
            </>
          )}
          <input type="submit" value={`${isLoadingModal ? 'Criando...' : 'Criar Quiz'}`} />
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
  );
}
