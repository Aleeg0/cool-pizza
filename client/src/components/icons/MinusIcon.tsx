import React, {FC} from 'react';
import {IconProps} from "./lib/IconProps";

export const MinusIcon: FC<IconProps> = ({size}) => {
  return (
    <svg
      width={size}
      height="2"
      viewBox="0 0 11 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.28683 1L1.42969 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};