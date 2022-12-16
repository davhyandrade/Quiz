import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/layout';

export default function Menu() {
  const [isActiveButtonMenu, setIsActiveButtonMenu] = useState<number>(0);

  const urlImage = [
    {
      name: 'logo',
      url: 'https://i.postimg.cc/2yHNW1HW/logo-quiz.png',
    },
  ];

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
      url: '/setting',
    },
  ];

  useEffect(() => {
    setIsActiveButtonMenu(buttonsMenu.map((object) => object.url).indexOf(`${Router.pathname}`));
  }, []);

  const { handlePageLoaded } = useContext(Context);

  return (
    <nav onLoad={handlePageLoaded} className="menu">
      <div className="position">
        <Image src={urlImage[0].url} alt="logo" loading="eager" width={85} height={46} priority />
        <div>
            <Link href='/login'>Sign in</Link>
            <Link href='/register'>Sign up</Link>
        </div>
      </div>
      <div className="btn-menu">
        {buttonsMenu.map((item, id) => {
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
