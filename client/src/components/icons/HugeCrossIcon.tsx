import React, {FC} from 'react';
import {IconProps} from "@/components/icons/lib/IconProps";

export const HugeCrossIcon: FC<IconProps> = ({size = 25}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 25 25">
      <path fill="#fff" fillRule="evenodd" d="M9.61 12.199.54 3.129A1.833 1.833 0 1 1 3.13.536l9.07 9.07L21.27.54a1.833 1.833 0 0 1 2.592 2.592l-9.068 9.068 9.07 9.07a1.833 1.833 0 0 1-2.59 2.592l-9.071-9.07-9.074 9.073a1.833 1.833 0 0 1-2.591-2.592z" clipRule="evenodd"/>
    </svg>
  );
};