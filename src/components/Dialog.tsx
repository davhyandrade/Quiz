import { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';
import Image from 'next/image';

export default function Dialog() {
  const { handleCloseDialog } = useContext(Context);
  const { inputDescriptionQuiz } = useContext(Context);
  const { inputTitleQuiz } = useContext(Context);
  const { inputQuestionsQuiz }: any = useContext(Context);
  const { inputStatementQuiz }: any = useContext(Context);
  const { inputImageQuiz }: any = useContext(Context);
  const { dialog } = useContext(Context);

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    handleForm(event);
  }

  const { setIsActiveDialog } = useContext(Context);

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      setIsActiveDialog(false);
    }
  }

  const [questions, setQuestions] = useState<any>([{}]);
  const [id, setId] = useState<number>(1);

  function handleQuestions() {
    if (inputQuestionsQuiz.current.value === '') return;

    let i = id;
    i++
    setId(i)
    
    const questionObject = new Object({
      [inputQuestionsQuiz.current.name]: inputQuestionsQuiz.current.value,
      id,
    });

    setQuestions((prevData: Array<object>) => [...prevData, questionObject]);

    inputQuestionsQuiz.current.value = '';

    handleUpdatePageQuiz();
  }

  function handleDeleteQuestion(id: number) {
    setQuestions(questions.filter((value: any) => value.id !== id));
    questions.map((element: any) => {
      if (element.id > id) element.id -= 1;
    });
  }

  const [previewSource, setPreviewSource] = useState();

  function previewFile(file: any) {
    const reader: any = new FileReader();

    if (file) reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const { setDataQuiz } = useContext(Context);
  const { dataQuiz } = useContext(Context);

  function handleUpdatePageQuiz() {
    console.log(typeof questions[0].page);
    console.log(questions);
    
    if (questions.length <= 1 && typeof questions[0].id === 'undefined') return;

    const updateDataQuiz = {
      [inputStatementQuiz.current.name]: inputStatementQuiz.current.value,
      questions,
    };

    const pageQuizIndex = dataQuiz.findIndex((object: any) => object.id == isActivePageQuiz);
    
    const updatePageQuiz = [...dataQuiz];
    
    updatePageQuiz[pageQuizIndex].data = updateDataQuiz;
    
    setDataQuiz(updatePageQuiz);

    // console.log(dataQuiz);
  }

  const [idDataQuiz, setIdDataQuiz] = useState<number>(1);

  function createPageQuiz() {
    let i = idDataQuiz;
    i++
    setIdDataQuiz(i)

    const Page = 'Page ' + idDataQuiz;

    const pageQuiz = new Object({
      id: idDataQuiz,
      page: Page,
      data: {
        statement: '',
        questions: '',
      },
    });

    setDataQuiz((prevData: Array<object>) => [...prevData, pageQuiz]);

    console.log(dataQuiz);
  }

  const [isActivePageQuiz, setIsActivePageQuiz] = useState<number>(1);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(questions);
  //   }, 2000)
  // }, [])

  return (
    <dialog onKeyDown={handleKeyPressDialog} ref={dialog}>
      <div className="position">
        <form onSubmit={handleSubmit}>
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
          <div className="field-page">
            <div>
              <button onClick={createPageQuiz}>Add Page</button>
              {dataQuiz &&
                dataQuiz.slice(1, dataQuiz.length).map((item: any) => {
                  return (
                    <span onClick={() => [setIsActivePageQuiz(item.id), inputStatementQuiz.current.value = dataQuiz[item.id].data.statement]} className={`${isActivePageQuiz === item.id && 'active'}`} key={item.id}>
                      {item.page}
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
                {dataQuiz[isActivePageQuiz].data.questions.length >= 1 &&
                  dataQuiz[isActivePageQuiz].data.questions.slice(0, dataQuiz[isActivePageQuiz].data.questions.length).map((item: any) => {
                    return (
                      <div key={item.id} className="field-text">
                        <span>{item.id + ' - ' + item.questions}</span>
                        <Image
                          onClick={() => handleDeleteQuestion(item.id)}
                          id="btn-delete"
                          src="https://i.postimg.cc/prSVPYvN/btn-close.png"
                          alt="button delete"
                          width={20}
                          height={20}
                        />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          <input type="submit" value="Criar Quiz" />
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
