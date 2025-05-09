import React, {FC} from 'react';
import {IconProps} from "@/components/icons/lib/IconProps";

export const BoxIcon: FC<IconProps> = ({size = 16, ...props}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 4.5L8 1L1 4.5V11.5L8 15L15 11.5V4.5Z" stroke="#B9B9B9" strokeLinejoin="round"/>
      <path d="M11.5 2.75L4.5 6.25M1 4.5L8 8L1 4.5ZM8 15V8V15ZM15 4.5L8 8L15 4.5Z" stroke="#B9B9B9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};