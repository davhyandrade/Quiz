import { createContext, LegacyRef, ReactNode, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import Menu from '../components/Menu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Footer from '../components/Footer';

interface IContext {
  handlePageLoaded?: any;
  handleCloseDialog?: any;
  handleOpenDialog?: any;
  inputTitleQuiz?: LegacyRef<HTMLInputElement>;
  inputDescriptionQuiz?: LegacyRef<HTMLInputElement>;
  inputQuestionsQuiz?: LegacyRef<HTMLInputElement>;
  inputStatementQuiz?: LegacyRef<HTMLInputElement>;
  inputImageQuiz?: LegacyRef<HTMLInputElement>;
  inputResponseQuiz?: LegacyRef<HTMLInputElement>;
  setIsActiveDialog?: any;
  isActiveDialog?: boolean;
  dialog?: LegacyRef<HTMLDialogElement>;
  setDataQuiz?: any;
  dataQuiz?: any;
  setIsActiveLoading?: any;
  data?: any;
  fetchData?: any;
  setPreviewSource?: any;
  previewSource?: any;
}

export const Context = createContext<IContext>({});

type ComponentProps = {
  children: ReactNode;
};

export default function Layout({ children }: ComponentProps) {
  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(true);
  const [isVisiblePage, setIsVisiblePage] = useState<boolean>(false);

  useEffect(() => {
    setIsVisiblePage(true);
  });

  function handlePageLoaded() {
    setTimeout(() => {
      setIsActiveLoading(false);
    }, 2000);
  }

  const [data, setData] = useState<any>();

  const fetchData = async () => {
    setIsActiveLoading(true);

    try {
      const data = await axios.get('api/quiz');
      setData(data.data.quizzes);
      console.log(data.data.msg);
      setIsActiveLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      setIsActiveLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const dialog = useRef<any>(null);
  const inputTitleQuiz = useRef<any>(null);
  const inputDescriptionQuiz = useRef<any>(null);
  const inputQuestionsQuiz = useRef<any>(null);
  const inputStatementQuiz = useRef<any>(null);
  const inputImageQuiz = useRef<any>(null);
  const inputResponseQuiz = useRef<any>(null);

  function handleOpenDialog() {
    window.scrollTo(0, 0);
    dialog.current.showModal();
    setIsActiveDialog(true);
  }

  function handleCloseDialog() {
    inputTitleQuiz.current.value = '';
    inputDescriptionQuiz.current.value = '';
    if (dataQuiz.length >= 2) {
      inputQuestionsQuiz.current.value = '';
      inputStatementQuiz.current.value = '';
    }
    setIsActiveDialog(false);
    setPreviewSource('');
    setDataQuiz([{}]);
    dialog.current.close();
  }

  const [previewSource, setPreviewSource] = useState<string>();
  const [dataQuiz, setDataQuiz] = useState<any>([{}]);

  return (
    <>
      {isActiveLoading && <Loader />}
      {isVisiblePage && (
        <Context.Provider
          value={{
            handlePageLoaded,
            handleCloseDialog,
            handleOpenDialog,
            inputDescriptionQuiz,
            inputTitleQuiz,
            inputQuestionsQuiz,
            inputImageQuiz,
            inputStatementQuiz,
            inputResponseQuiz,
            setIsActiveDialog,
            isActiveDialog,
            dialog,
            setDataQuiz,
            dataQuiz,
            setIsActiveLoading,
            data,
            fetchData,
            setPreviewSource,
            previewSource,
          }}
        >
          <Menu />
          <section>{children}</section>
          <Footer/>
          <ToastContainer />
        </Context.Provider>
      )}
    </>
  );
}
