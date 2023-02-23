import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';
import Dropdown from '../components/Dropdown';
import { createGlobalStyle } from 'styled-components';

interface IProps {
  isActiveToggleMenu: boolean;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.isActiveToggleMenu &&
    `body {
      overflow: hidden;
    }`}
`;

export default function Menu() {
  const {
    isAuth,
    user,
    setIsActiveButtonMenu,
    buttonsMenu,
    isActiveButtonMenu,
    isActiveDropdown,
    setIsActiveDropdown,
    isActiveSearchField,
    setIsActiveSearchField
  } = useContext(Context);

  const urlImage = [
    {
      name: 'logo',
      url: 'https://i.postimg.cc/2yHNW1HW/logo-quiz.png',
    },
  ];

  useEffect(() => {
    setIsActiveButtonMenu(
      buttonsMenu.map((object: any) => object.url.split('/')[1]).indexOf(Router.pathname.split('/')[1])
    );
  }, []);

  function handleDropdown() {
    if (isActiveDropdown) {
      setIsActiveDropdown(false);
    } else {
      setIsActiveDropdown(true);
    }
  }

  const [isActiveToggleMenu, setIsActiveToggleMenu] = useState<boolean>(false);

  function toggleMenu() {
    if (isActiveToggleMenu) {
      setIsActiveToggleMenu(false);
    } else {
      setIsActiveToggleMenu(true);
    }
  }

  function handleCloseMenuMobile() {
    setTimeout(() => {
      setIsActiveToggleMenu(false);
    }, 1500);
  }

  function handleButton(id: number) {
    setIsActiveButtonMenu(id);
    handleCloseMenuMobile();
  }

  function handleSearchBar() {
    if (isActiveSearchField) {
      return setIsActiveSearchField(false);
    } else {
      return setIsActiveSearchField(true);
    }
  }

  return (
    <>
      <GlobalStyles isActiveToggleMenu={isActiveToggleMenu} />
      <nav className="menu">
        <div className="position">
          <Image src={urlImage[0].url} alt="logo" loading="eager" width={85} height={46} priority />
          <div>
              <svg
                onClick={handleSearchBar}
                id='btn-search'
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 200.000000 200.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path
                    d="M760 1609 c-105 -21 -221 -104 -285 -204 -116 -182 -89 -415 65 -566 131 -128 313 -166 489 -102 l74 26 181 -187 c159 -165 185 -188 213 -188 18 -1 43 6 57 16 33 21 59 72 52 100 -5 20 -96 119 -286 311 l-79 80 29 60 c104 210 36 456 -163 588 -96 64 -231 90 -347 66z m227 -143 c119 -56 193 -159 201 -282 19 -299 -325 -468 -547 -268 -184 166 -126 474 107 559 63 23 179 19 239 -9z"
                  />
                </g>
              </svg>
            {!isAuth ? (
              window.innerWidth < 800 ? (
                <>
                  <div onClick={toggleMenu} className={`toggle-menu ${isActiveToggleMenu && 'active'}`}>
                    <div className="toggle-menu-item"></div>
                  </div>
                </>
              ) : (
                <>
                  <Link onClick={() => setIsActiveButtonMenu(-1)} href="/login">
                    Sign in
                  </Link>
                  <Link onClick={() => setIsActiveButtonMenu(-1)} href="/register">
                    Sign up
                  </Link>
                </>
              )
            ) : (
              <>
                {!user.image ? (
                  <span onClick={handleDropdown}>{user.name.charAt(0)}</span>
                ) : (
                  <Image
                    onClick={handleDropdown}
                    src={user.image}
                    alt="image profile"
                    priority
                    loading="eager"
                    width={50}
                    height={50}
                  />
                )}
                {isActiveDropdown && <Dropdown />}
              </>
            )}
          </div>
        </div>
        <div className="btn-menu">
          {buttonsMenu.map((item: any, id: number) => {
            return (
              <Link
                key={id}
                onClick={() => setIsActiveButtonMenu(id)}
                id={`${isActiveButtonMenu === id && 'active'}`}
                href={item.url}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      {isActiveToggleMenu && (
        <div className="menu-mobile">
          <div className="position">
            {buttonsMenu.map((item: any, id: number) => {
              return (
                <Link
                  key={id}
                  onClick={() => handleButton(id)}
                  id={`${isActiveButtonMenu === id && 'active'}`}
                  href={item.url}
                  translate="no"
                >
                  {item.name}
                </Link>
              );
            })}
            <Link className="btns-auth" href="/login" onClick={() => handleButton(-1)}>
              Entrar
            </Link>
            <Link className="btns-auth" href="/register" onClick={() => handleButton(-1)}>
              Cadastrar-se
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
