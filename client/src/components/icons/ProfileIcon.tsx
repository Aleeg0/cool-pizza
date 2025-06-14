import React, {FC} from 'react';
import {IconProps} from "./lib/IconProps";

export const ProfileIcon: FC<IconProps> = ({size = 14, ...props}) => {
  return (
    <svg width={size}
         height={size}
         viewBox="0 0 13 15"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
    >
      <path
        d="M11.5706 14.2087V12.8198C11.5706 12.0831 11.2921 11.3765 10.7966 10.8556C10.301 10.3347 9.6288 10.042 8.92793 10.042H3.64264C2.94177 10.042 2.2696 10.3347 1.77401 10.8556C1.27842 11.3765 1 12.0831 1 12.8198V14.2087"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.28522 7.26405C7.74471 7.26405 8.92787 6.0204 8.92787 4.48627C8.92787 2.95215 7.74471 1.7085 6.28522 1.7085C4.82573 1.7085 3.64258 2.95215 3.64258 4.48627C3.64258 6.0204 4.82573 7.26405 6.28522 7.26405Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};