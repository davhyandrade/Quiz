import axios from 'axios';
import { destroyCookie, parseCookies } from 'nookies';
import { useContext, useEffect, useRef, useState } from 'react';
import LoginRedirect from '../../components/LoginRedirect';
import NavbarSettings from '../../components/NavbarSettings';
import { Context } from '../../context/layout';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';

interface IProps {
  firstDeleteAccount: boolean;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.firstDeleteAccount &&
    `.account-field > .position .btn-delete-account {
      color: red;
    }`}
`;

export default function Account() {
  const { isAuth, setIsAuth, fetchDataUser, user, setIsActiveButtonMenu } = useContext(Context);

  useEffect(() => {
    fetchDataUser();
    setIsVisibleProfilePicture(true);
  }, []);

  const inputName = useRef<any>(null);
  const inputEmail = useRef<any>(null);
  const inputImageRef = useRef<any>(null);

  const [isVisibleProfilePicture, setIsVisibleProfilePicture] = useState<boolean>(false);
  const [hadChangePreviewSource, setHadChangePreviewSource] = useState<boolean>(false);
  const [previewSource, setPreviewSource] = useState<any>(user?.image);

  function previewFile(file: any) {
    if (!isVisibleProfilePicture) setIsVisibleProfilePicture(true);

    setHadChangePreviewSource(true);

    const reader: any = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const [isLoadingSaveChange, setIsLoadingSaveChange] = useState<boolean>(false);

  async function handleSaveChange() {
    setIsLoadingSaveChange(true);

    let image = user.image;

    if (resetProfilePicture) {
      image = '';
    }

    if (hadChangePreviewSource) {
      const imageURL = await axios.post('/api/image.upload', {
        imageBase64: previewSource,
        preset: 'quiz-profile-images-uploads',
      });
      console.log(imageURL.data.uploadResponse.url);

      image = imageURL.data.uploadResponse.url;
    }

    const { token }: any = parseCookies();

    if (token) {
      try {
        const updateUser = await axios.put(
          `/api/auth/user/${(jwt.decode(token) as any).id}`,
          {
            name: inputName.current.value,
            email: inputEmail.current.value,
            image: image,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (updateUser.status === 200) {
          toast.success('Usuário alterado com sucesso!', {
            theme: 'colored',
          });
          setIsLoadingSaveChange(false);
          setResetProfilePicture(false);
          fetchDataUser();
        }
      } catch (error: any) {
        setIsLoadingSaveChange(false);
        setResetProfilePicture(false);
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }
  }

  const [resetProfilePicture, setResetProfilePicture] = useState<boolean>(false); 

  function handleReset() {
    setResetProfilePicture(true);
    setIsVisibleProfilePicture(false);
    setHadChangePreviewSource(false);
    user.image = undefined;
    setPreviewSource(undefined);
    inputImageRef.current.value = '';
  }

  const [firstDeleteAccount, setFirstDeleteAccount] = useState<boolean>(false);

  async function handleDeleteAccount() {
    if (!firstDeleteAccount) return setFirstDeleteAccount(true);

    const { token }: any = parseCookies();

    if (token) {
      try {
        const deleteUser = await axios.delete(`/api/auth/user/${(jwt.decode(token) as any).id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (deleteUser.status === 200) {
          toast.success('Usuário deletado com sucesso!', {
            theme: 'colored',
          });
          destroyCookie(undefined, 'token');
          setIsAuth(false);
        }
      } catch (error: any) {
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }
  }

  return (
    <>
      <GlobalStyles firstDeleteAccount={firstDeleteAccount} />
      <div className="settings-field">
        <div className="position">
          <NavbarSettings />
          {isAuth ? (
            <>
              <div className="account-field">
                <div className="position">
                  <h1>Account Setup</h1>
                  <span>Change your profile data.</span>
                  <div>
                    <label htmlFor="name-account">Name</label>
                    <input ref={inputName} id="name-account" type="text" defaultValue={user.name} />
                  </div>
                  <div>
                    <label htmlFor="email-account">E-mail</label>
                    <input ref={inputEmail} id="email-account" type="text" defaultValue={user.email} />
                  </div>
                  <div className="field-upload">
                    {isVisibleProfilePicture && hadChangePreviewSource ? (
                      <div className="field-image">
                        <img src={previewSource} alt="imagem" />
                      </div>
                    ) : (
                      user.image && (
                        <div className="field-image">
                          <img src={user.image} alt="imagem" />
                        </div>
                      )
                    )}
                    <input
                      onChange={() => previewFile(inputImageRef.current.files[0])}
                      ref={inputImageRef}
                      type="file"
                      name="upload"
                      id="input-file"
                    />
                    <div>
                      <label htmlFor="input-file">
                        {!hadChangePreviewSource && !user.image ? 'Add profile picture' : 'Change Image'}
                      </label>
                      {user.image ? (
                        <button onClick={handleReset}>Reset</button>
                      ) : (
                        hadChangePreviewSource && <button onClick={handleReset}>Reset</button>
                      )}
                    </div>
                  </div>
                  <Link onClick={() => setIsActiveButtonMenu(-1)} href='/forgot-password' className="btn-text">Change Password</Link>
                  <span onClick={handleDeleteAccount} className="btn-text btn-delete-account">
                    {!firstDeleteAccount ? 'Delete account' : 'Press again to confirm'}
                  </span>
                  <button onClick={handleSaveChange}>{isLoadingSaveChange ? 'Saving...' : 'Save Change'}</button>
                </div>
              </div>
            </>
          ) : (
            <LoginRedirect />
          )}
        </div>
      </div>
    </>
  );
}
