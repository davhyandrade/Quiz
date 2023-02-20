import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Context } from '../context/layout';

interface IProps {
  message: string;
}

interface IPropsStyled {
  isActiveWarningModal: boolean | undefined;
}

const GlobalStyles = createGlobalStyle<IPropsStyled>`    
  ${(props) =>
    props.isActiveWarningModal &&
    `body {
      overflow: hidden;
    }`}
`;

export default function WarningModal({ message }: IProps) {
  const { setIsActiveWarningModal, isActiveWarningModal } = useContext(Context);

  function handleCloseModal() {
    setIsActiveWarningModal(false);
  }

  return (
    <>
      <GlobalStyles isActiveWarningModal={isActiveWarningModal} />
      <div className="modal-field">
        <div className="position">
          <svg
            onClick={handleCloseModal}
            id="btn-delete"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 800.000000 800.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path d="M1085 7600 c-170 -27 -358 -124 -472 -242 -268 -279 -309 -718 -97 -1045 24 -38 435 -456 1166 -1188 620 -622 1128 -1137 1128 -1145 0 -8 -510 -526 -1134 -1150 -974 -975 -1139 -1145 -1175 -1206 -232 -397 -120 -889 256 -1135 70 -46 177 -92 252 -110 148 -36 324 -29 467 19 194 65 125 2 1379 1254 627 626 1145 1138 1150 1138 6 0 505 -495 1110 -1101 605 -605 1127 -1122 1161 -1149 83 -67 192 -124 299 -155 78 -24 107 -27 225 -27 115 1 148 5 225 27 280 82 487 285 576 565 21 67 24 93 23 240 0 158 -2 169 -32 260 -66 200 -14 143 -1264 1393 -620 622 -1128 1135 -1128 1141 0 6 502 513 1116 1126 613 613 1135 1142 1159 1175 54 76 96 160 126 255 21 66 24 94 24 235 0 140 -3 169 -23 235 -90 284 -303 493 -585 571 -115 32 -317 33 -429 1 -96 -27 -172 -60 -245 -108 -38 -24 -457 -435 -1195 -1172 -1007 -1006 -1139 -1134 -1153 -1122 -9 7 -517 514 -1128 1125 -846 845 -1129 1122 -1184 1158 -89 59 -177 99 -265 121 -84 20 -253 28 -333 16z" />
            </g>
          </svg>
          <div className="header">
            <h1>Aviso!</h1>
          </div>
          <span>{message}</span>
        </div>
      </div>
    </>
  );
}
