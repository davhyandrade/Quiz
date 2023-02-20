import axios from 'axios';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Context } from '../context/layout';
import LoginRedirect from '../components/LoginRedirect';
import DialogEdit from '../components/DialogEdit';
import Link from 'next/link';
import WarningModal from '../components/WarningModal';

export default function Edit() {
  const {
    isAuth,
    handlePageLoaded,
    handleOpenDialog,
    setIsLoadingModal,
    setIsActiveButtonMenu,
    setIsActiveWarningModal,
    isActiveWarningModal,
  } = useContext(Context);

  const [data, setData] = useState<any>();
  const [idQuiz, setIdQuiz] = useState<string>();

  async function fetchData() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const data = await axios.get('api/quiz/edit', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (typeof data.data.quizzes !== 'undefined') setData(data.data.quizzes);
        handlePageLoaded();
      } catch (error: any) {
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }

    if (!isAuth) handlePageLoaded();
  }

  useEffect(() => {
    fetchData();
    setIsActiveWarningModal(true);
  }, []);

  function handleClickQuiz(id: string) {
    setIdQuiz(id);
    setIsLoadingModal(true);
    handleOpenDialog();
  }

  const textWarning = 'Funcão em desenvolvimento, portanto não será possível salvar as alterações e apresentará alguns erros, em breve ele será finalizado!';

  return (
    <>
      {isAuth ? (
        data?.length > 0 ? (
          <div className="field-quizzes">
            {isActiveWarningModal && <WarningModal message={textWarning} />}
            <div className="position">
              {data &&
                data.map((item: any) => {
                  return (
                    <div onClick={() => handleClickQuiz(item._id)} key={item._id} className="quiz card">
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
            <DialogEdit idQuiz={idQuiz} />
          </div>
        ) : (
          <div className="field-no-quiz">
            <Image
              id="btn-no-quiz"
              src="https://i.postimg.cc/FHKgzQ0r/fadfasdfsdafsf.png"
              alt="image"
              width={100}
              height={100}
              priority
            />
            <h1>Nenhum Quiz!</h1>
            <span>Você não criou nenhum questionário, portanto não há o que editar.</span>
            <Link onClick={() => setIsActiveButtonMenu(0)} href="/">
              Go to Home
            </Link>
          </div>
        )
      ) : (
        <LoginRedirect />
      )}
    </>
  );
}
