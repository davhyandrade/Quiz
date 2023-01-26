import { createContext, LegacyRef, ReactNode, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import Menu from '../components/Menu';
import Themes from '../components/Themes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Footer from '../components/Footer';
import Router from 'next/router';
import Quiz from '../components/Quiz';
import { destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

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
  setIsActiveTheme?: any;
  isActiveTheme?: any;
  handleIsActiveTheme?: any;
  setIsActiveQuiz?: any;
  setQuiz?: any;
  quiz?: any;
  isActiveQuiz?: any;
  setIdDataQuiz?: any;
  idDataQuiz?: any;
  setIsLoadingModal?: any;
  isLoadingModal?: any;
  isAuth?: boolean;
  setIsAuth?: any;
  fetchDataUser?: any;
  user?: any;
  buttonsMenu?: any;
  setIsActiveButtonMenu?: any;
  isActiveButtonMenu?: number;
  setIsActiveDropdown?: any;
  isActiveDropdown?: boolean;
}

export const Context = createContext<IContext>({});

type ComponentProps = {
  children: ReactNode;
};

export default function Layout({ children }: ComponentProps) {
  const [user, setUser] = useState<object | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function fetchDataUser() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const requestUser = await axios.get(`/api/auth/user/${(jwt.decode(token) as any).id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(requestUser.data.user);
        setIsAuth(true);
        handlePageLoaded();
      } catch (error: any) {
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }

    if (!isAuth) handlePageLoaded();
  }

  useEffect(() => {
    fetchDataUser();
  }, []);

  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(true);
  const [isVisiblePage, setIsVisiblePage] = useState<boolean>(false);

  useEffect(() => {
    setIsVisiblePage(true);
  }, []);

  function handlePageLoaded() {
    setTimeout(() => {
      setIsActiveLoading(false);
    }, 2500);
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
    if (Router.pathname !== '/' && Router.pathname !== '/settings/account' && Router.pathname !== '/edit' && Router.pathname !== '/forgot-password')
      handlePageLoaded();
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

  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [idDataQuiz, setIdDataQuiz] = useState<number>(1);
  const [previewSource, setPreviewSource] = useState();

  function handleCloseDialog() {
    inputTitleQuiz.current.value = '';
    inputDescriptionQuiz.current.value = '';
    if (dataQuiz.length >= 2) {
      inputQuestionsQuiz.current.value = '';
      inputStatementQuiz.current.value = '';
    }
    setIsActiveDialog(false);
    setPreviewSource(undefined);
    inputImageQuiz.current.value = '';
    setDataQuiz([{}]);
    setIdDataQuiz(1);
    dialog.current.close();
    setIsLoadingModal(false);
  }

  const [dataQuiz, setDataQuiz] = useState<any>([{}]);

  const [isActiveTheme, setIsActiveTheme] = useState<string>('light');

  function handleIsActiveTheme() {
    const theme: any = localStorage.getItem('theme');
    if (theme) setIsActiveTheme(theme);
  }

  useEffect(() => {
    handleIsActiveTheme();
  }, []);

  const [isActiveQuiz, setIsActiveQuiz] = useState<boolean>(false);

  const [quiz, setQuiz] = useState<any>();

  function handleCloseQuiz() {
    setIsActiveQuiz(false);
  }

  const [isActiveButtonMenu, setIsActiveButtonMenu] = useState<number>(0);

  const buttonsMenu = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Edit',
      url: '/edit',
    },
    {
      name: 'Settings',
      url: '/settings/account',
    },
  ];

  const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);

  return (
    <>
      {isActiveLoading && <Loader />}
      {isActiveQuiz && <Quiz handleCloseQuiz={handleCloseQuiz} data={quiz} />}
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
            setIsActiveTheme,
            isActiveTheme,
            handleIsActiveTheme,
            setIsActiveQuiz,
            isActiveQuiz,
            setQuiz,
            quiz,
            setIdDataQuiz,
            idDataQuiz,
            setIsLoadingModal,
            isLoadingModal,
            isAuth,
            setIsAuth,
            fetchDataUser,
            user,
            buttonsMenu,
            setIsActiveButtonMenu,
            isActiveButtonMenu,
            setIsActiveDropdown,
            isActiveDropdown
          }}
        >
          <Menu />
          <section>{children}</section>
          <Footer />
          <ToastContainer />
          <Themes />
        </Context.Provider>
      )}
    </>
  );
}
