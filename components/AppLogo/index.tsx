import React from "react";
import AppLogoStyles from "./AppLogo.module.scss";

// height * 2.125 = width
// take in only height or width & calculate other from arg

const AppLogoSvg: React.FC = () => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 13.493747 6.3499997"
      height="24px"
      width="51px"
    >
      <g transform="translate(-58.559398,-100.76162)" id="layer1">
        <g
          // style="stroke-width:0.950301"
          className={AppLogoStyles["g1"]}
          transform="matrix(1.0530285,0,0,1.0515672,10.85606,7.9819621)"
          id="g905"
        >
          <path
            id="rect867"
            className={AppLogoStyles["path"]}
            // style="fill:#000000;stroke:#000000;stroke-width:0.950301;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:markers fill stroke"
            d="m 45.77624,90.472841 v 3.319061 h 5.085416 v -0.0035 z"
          />
          <path
            id="path872"
            className={AppLogoStyles["path"]}
            // style="fill:#000000;stroke:#000000;stroke-width:0.950301;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:markers fill stroke"
            d="M 45.77624,88.721992 50.861656,92.0376 V 88.706485 H 45.77624 Z"
          />
        </g>
        <ellipse
          ry="2.675005"
          rx="2.677875"
          cy="103.93662"
          cx="68.875275"
          id="path875"
          className={AppLogoStyles["ellipse"]}
          // style="fill:#000000;stroke:#000000;stroke-width:0.99999;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:markers fill stroke"
        />
      </g>
    </svg>
  );
};

export default AppLogoSvg;
