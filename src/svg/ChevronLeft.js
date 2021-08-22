import React from "react";
import { SvgXml } from "react-native-svg";
export default function ({ height = 40, width = 50 }) {
  const svgMarkup = `<svg width="${width}" height="${height}" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="chevron-left">
  <g id="arrow-down">
  <path id="Path 3" d="M14 6.5L8 12.5L14 18.5" stroke="#EDFFFF" stroke-width="2" stroke-linecap="round"/>
  </g>
  </g>
  </svg>

  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width={`${width}px`} />;

  return <SvgImage />;
}
