import { SVGProps } from "react";

const NomeDoIcone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill={props.fill || "none"}
    {...props}
  >
    <path
      stroke={props.stroke || "#979188"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.21 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <path
      stroke={props.stroke || "#979188"}
      strokeLinecap="square"
      strokeLinejoin="round"
      d="m21.21 21-4.35-4.35M11.21 8v6M8.21 11h6"
    />
  </svg>
);
export default NomeDoIcone;
