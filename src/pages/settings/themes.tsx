import NavbarSettings from '../../components/NavbarSettings';
import Image from 'next/image';
import { useContext } from 'react';
import { Context } from '../../context/layout';

export default function Themes() {
  const { isActiveTheme } = useContext(Context);
  const { handleIsActiveTheme } = useContext(Context);

  const themesCards = [
    {
      name: 'Light Mode',
      theme: 'light',
      image: 'https://i.postimg.cc/wT21VRXT/breafing-light.png',
    },
    {
      name: 'Dark Mode',
      theme: 'dark',
      image: 'https://i.postimg.cc/02Pfjm58/breafing-dark.png',
    },
  ];

  return (
    <>
      <div className="settings-field">
        <div className="position">
          <NavbarSettings />
          <div className="theme-field">
            <div className="position">
              <h1>Theme preferences</h1>
              <span>
                Choose how the Quiz looks to you. Select a single theme or sync with your system and automatically
                switch between themes.
              </span>
              <div>
                {themesCards.map((item, id) => {
                  return (
                    <div
                      onClick={() => [localStorage.setItem('theme', item.theme), handleIsActiveTheme()]}
                      key={id}
                      className={`theme-card ${isActiveTheme === item.theme && 'active'}`}
                    >
                      <div>
                        <h1>{item.name}</h1>
                      </div>
                      <Image src={item.image} alt="theme image" width={250} height={143} loading="eager" priority />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
