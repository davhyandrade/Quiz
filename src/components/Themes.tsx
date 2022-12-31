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
      --bg-panel: #f5f5f5;
      --color-text: gray; 
      --color-primary: rgb(0, 132, 255);
      --color-border: #edeff0;
      --color-headings: #454545;
      --color: white;
      --color-opposite: rgba(0, 0, 0, 0.7);
      }`}
  ${(props) =>
    props.isActiveThemeDarkOrLight === 'dark' &&
    `:root {
      --bg-color: #10151b;
      --bg-panel: #20262e;
      --color-text: #b8b8b8;
      --color-primary: rgb(138, 180, 248);
      --color-border: rgb(255 255 255 / 10%);
      --color-headings: white;
      --color: #10151b;
      --color-opposite: rgba(0, 0, 0, 0.7);
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

    svg {
      filter: invert(1);
    }
    
    .field-quizzes > .position .add-button {
      &:hover {
        > img {
          transition: 1s;      
          filter: invert(1);
        }
      }
      
      &:active {
        > img {
          transition: 0.1s;
          filter: invert(1);
        }
      }

      img {
        filter: invert(1);
      }
    }
  `}
`;

export default function Themes() {
  const { isActiveTheme } = useContext(Context);

  return <GlobalStyles isActiveThemeDarkOrLight={isActiveTheme} />;
}
