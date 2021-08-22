import React from "react";
import { SvgXml } from "react-native-svg";
export default function ({ height = 100, width = 200 }) {
  const svgMarkup = `<svg
  id="visual"
  viewBox="0 0 960 300"
  height=${height}
  width=${width}
  version="1.1"
>
<g transform="translate(460.6109417089444 342.586782278528)">
    <path
      d="M126.1 -135.6C160.3 -91.9 182.6 -46 177.3 -5.3C172 35.4 139 70.7 104.9 97.7C70.7 124.7 35.4 143.4 -6.2 149.6C-47.8 155.8 -95.7 149.7 -128.5 122.7C-161.4 95.7 -179.2 47.8 -190.6 -11.4C-202 -70.7 -207.1 -141.4 -174.3 -185.1C-141.4 -228.8 -70.7 -245.4 -12.4 -233C46 -220.6 91.9 -179.3 126.1 -135.6"
      fill="#62C2F8"
    ></path>
  </g>
  <g transform="translate(460.6109417089444 342.586782278528)">
    <path
      d="M126.1 -135.6C160.3 -91.9 182.6 -46 177.3 -5.3C172 35.4 139 70.7 104.9 97.7C70.7 124.7 35.4 143.4 -6.2 149.6C-47.8 155.8 -95.7 149.7 -128.5 122.7C-161.4 95.7 -179.2 47.8 -190.6 -11.4C-202 -70.7 -207.1 -141.4 -174.3 -185.1C-141.4 -228.8 -70.7 -245.4 -12.4 -233C46 -220.6 91.9 -179.3 126.1 -135.6"
      fill="#62C2F8"
    ></path>
  </g>
</svg>

  `;
  const SvgImage = () => (
    <SvgXml
      xml={svgMarkup}
      width="100%"
      height="100%"
      style={{ borderWidth: 10, borderColor: "gold" }}
    />
  );

  return <SvgImage />;
}
