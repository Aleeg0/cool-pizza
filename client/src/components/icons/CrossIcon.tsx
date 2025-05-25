import {FC, memo} from 'react';
import {IconProps} from "@/components/icons/lib/IconProps";

const CrossIcon: FC<IconProps> = ({size = 20}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.353 3.08a.5.5 0 0 0-.707 0l-.566.566a.5.5 0 0 0 0 .707l4.94 4.94a1 1 0 0 1 0 1.413l-4.94 4.94a.5.5 0 0 0 0 .707l.566.566a.5.5 0 0 0 .707 0l4.94-4.94a1 1 0 0 1 1.413 0l4.94 4.94a.5.5 0 0 0 .707 0l.566-.566a.5.5 0 0 0 0-.707l-4.94-4.94a1 1 0 0 1 0-1.414l4.94-4.94a.5.5 0 0 0 0-.706l-.566-.566a.5.5 0 0 0-.707 0l-4.94 4.94a1 1 0 0 1-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default memo(CrossIcon);