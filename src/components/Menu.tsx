import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';
import Dropdown from '../components/Dropdown';

export default function Menu() {
  const { isAuth, user, setIsActiveButtonMenu, buttonsMenu, isActiveButtonMenu, isActiveDropdown, setIsActiveDropdown } = useContext(Context);

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

  return (
    <nav className="menu">
      <div className="position">
        <Image src={urlImage[0].url} alt="logo" loading="eager" width={85} height={46} priority />
        <div>
          {!isAuth ? (
            <>
              <Link onClick={() => setIsActiveButtonMenu(-1)} href="/login">
                Sign in
              </Link>
              <Link onClick={() => setIsActiveButtonMenu(-1)} href="/register">
                Sign up
              </Link>
            </>
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
  );
}
