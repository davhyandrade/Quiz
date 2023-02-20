import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Context } from '../context/layout';

interface IProps {
  isActiveThemeDarkOrLight: string;
}

const GlobalStyles = createGlobalStyle<IProps>`
  ${(props) =>
    props.isActiveThemeDarkOrLight === 'light' &&
    `:root {
      --bg-color: white;
      --bg-backdrop: #f5f5f5b8;
      --bg-panel: #f5f5f5;
      --bg-panel-menu: #f5f5f545;
      --color-text: gray; 
      --color-primary: rgb(0, 132, 255);
      --color-border: #edeff0;
      --color-headings: #454545;
      --color: white;
      --color2: white;
      --color-opposite: rgba(0, 0, 0, 0.7);
      --bg-description: #cdcdcd;
      }
      
    #btn-login-redirect, #btn-no-quiz {
      filter: hue-rotate(341deg) opacity(0.8) grayscale(0.9);
    }`}
  ${(props) =>
    props.isActiveThemeDarkOrLight === 'dark' &&
    `:root {
      --bg-color: #10151b;
      --bg-backdrop: #20262ec7;
      --bg-panel: #20262e;
      --bg-panel-menu: #20262e40;
      --color-text: #b8b8b8;
      --color-primary: rgb(138, 180, 248);
      --color-border: rgb(255 255 255 / 10%);
      --color-headings: white;
      --color: #10151b;
      --color-opposite: rgba(0, 0, 0, 0.7);
      --bg-description: #20262e;
      --color2: #9d9d9d;
    }
    
    footer > div > div:nth-child(2) img {
      filter: none;
    }

    dialog::-webkit-scrollbar-thumb {
      border: 1px solid var(--color-border);
    }

    dialog::backdrop {
      background: #ffffff15;
    }

    dialog #btn-delete {
      filter: invert(1);
    }

    svg {
      filter: invert(1);
    }
    
    #btn-login-redirect, #btn-no-quiz {
      filter: contrast(0.5) grayscale(0.8);
    }

    .field-quizzes > .position .add-button {
      &:hover {
        > svg {
          transition: 1s;      
          filter: invert(1);
        }
      }
      
      &:active {
        > svg {
          transition: 0.1s;
          filter: invert(1);
        }
      }

      svg {
        filter: invert(1);
      }
    }
  `}
`;

export default function Themes() {
  const { isActiveTheme } = useContext(Context);

  return <GlobalStyles isActiveThemeDarkOrLight={isActiveTheme} />;
}
