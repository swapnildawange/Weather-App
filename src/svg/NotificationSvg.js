import React from "react";
import { SvgXml } from "react-native-svg";
export default function ({ height = 30, width = 20 }) {
  const svgMarkup = `<svg width="${width}" height="${height}" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="bell">
  <path id="Rectangle 4" fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3C15.8137 3 18.5 5.68624 18.5 8.99995C18.5 10.9131 18.5 12.8341 18.5 14C18.5 17 20.5 18 20.5 18L4.5 18C4.5 18 6.5 17 6.5 14C6.5 12.8341 6.5 10.9131 6.5 8.99995C6.5 5.68624 9.18629 3 12.5 3V3Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  <path id="Oval" d="M10.5 18C10.5 19.1046 11.3954 20 12.5 20C13.6046 20 14.5 19.1046 14.5 18" stroke="black" stroke-width="1.5"/>
  </g>
  </svg>

  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width={`${width}`} />;

  return <SvgImage />;
}
