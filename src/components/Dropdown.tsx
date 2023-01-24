import Link from 'next/link';
import Router from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/layout';

export default function Dropdown() {
  const { user, setIsAuth, setIsActiveButtonMenu, buttonsMenu, isActiveDropdown, setIsActiveDropdown } = useContext(Context);

  const optionsDropdown = [
    {
      name: 'Account',
      url: '/settings/account',
    },
    {
      name: 'Themes',
      url: '/settings/themes',
    },
  ];

  function handleLogout() {
    destroyCookie(undefined, 'token');
    setIsAuth(false);
    toast.error('Usuário desconectado!', {
      theme: 'colored',
    });
  }

  const modal = useRef<any>(null);

  function handleClickOutside(event: any) {
    if (modal.current && !modal.current.contains(event.target)) {
      setIsActiveDropdown(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [modal])

  return (
    <div ref={modal} className="dropdown">
      <span className="header">{user.name.split(' ')[0]}</span>
      {optionsDropdown.map((item: any, id) => {
        return (
          <Link
            onClick={() =>
              setIsActiveButtonMenu(buttonsMenu.map((object: any) => object.url.split('/')[1]).indexOf('settings'))
            }
            href={Router.pathname !== item.url ? item.url : ''}
            key={id}
          >
            {item.name}
          </Link>
        );
      })}
      <span onClick={handleLogout} className="log-out">
        Log out
      </span>
    </div>
  );
}
