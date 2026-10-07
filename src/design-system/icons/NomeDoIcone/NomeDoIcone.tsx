import { SVGProps } from "react";

const NomeDoIcone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.21 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      d="m21.21 21-4.35-4.35M11.21 8v6M8.21 11h6"
    />
  </svg>
);
export default NomeDoIcone;
