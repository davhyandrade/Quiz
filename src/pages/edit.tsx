import axios from 'axios';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Dialog from '../components/Dialog';
import { toast } from 'react-toastify';
import { Context } from '../context/layout';
import LoginRedirect from '../components/LoginRedirect';

export default function Edit() {
  const { isAuth, handlePageLoaded } = useContext(Context);

  const [data, setData] = useState<any>();

  async function fetchData() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const data = await axios.get('api/quiz/edit', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setData(data.data.quizzes);
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
  }, []);

  return (
    <>
      {isAuth ? (
        <div className="field-quizzes">
          <div className="position">
            {data &&
              data.map((item: any) => {
                return (
                  <div onClick={() => Router.push(item._id)} key={item._id} className="quiz card">
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
          <Dialog />
        </div>
      ) : (
        <LoginRedirect/>
      )}
    </> 
  );
}
