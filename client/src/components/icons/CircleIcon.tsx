import React, {FC} from 'react';
import {IconProps} from "./lib/IconProps";

export const CircleIcon: FC<IconProps> = ({size = 317, ...props}) => {
  const c = size / 2;
  const r = c - 1

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={c} cy={c} r={r} stroke="#6F6E6F" strokeDasharray="1 5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
};