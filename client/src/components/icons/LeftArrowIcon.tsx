import React, {FC} from 'react';
import {IconProps} from "@/components/icons/lib/IconProps";

export const LeftArrowIcon: FC<IconProps> = ({size = 15, ...props}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 7.21167H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.71436 1.21753L14.7144 7.21161L8.71436 13.2057" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};