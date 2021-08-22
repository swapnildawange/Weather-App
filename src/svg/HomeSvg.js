import React from "react";
import { SvgXml } from "react-native-svg";
export default function HomeSvg({ height = 30, width = 40 }) {
  const svgMarkup = `<svg width="${width}" height="${height}" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="grid">
  <rect id="Rectangle" x="3.5" y="3" width="7" height="7" rx="2" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  <rect id="Rectangle Copy" x="14.5" y="3" width="7" height="7" rx="2" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  <rect id="Rectangle_2" x="3.5" y="14" width="7" height="7" rx="2" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  <rect id="Rectangle Copy 2" x="14.5" y="14" width="7" height="7" rx="2" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  </g>
  </svg>
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width={`${width}`} />;

  return <SvgImage />;
}
