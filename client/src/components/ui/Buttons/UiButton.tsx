import React, {FC} from 'react';
import {cn} from "@/utils";


interface ButtonProps {
  caption?: string;
  icon?: React.ReactNode;
  iconSize?: "s" | "m" | "l";
  type?: "primary" | "secondary";
  size?: "s" | "m" | "l"
  onClick?: () => void;
  isFullWidth?: boolean;
}

export const UiButton : FC<ButtonProps> = ({
  caption,
  icon,
  iconSize = "m",
  type = "primary",
  size = "m",
  onClick,
  isFullWidth = false
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "UiButton_root",
        `UiButton_${type}`,
        `UiButton-${size}`,
        isFullWidth ? 'UiButton_fullWidth' : ''
      )}
    >
      {icon &&
        <span className={cn(
          "UiButton_icon",
          `UiKit_icon-${iconSize}`,
        )}>
          {icon}
        </span>
      }
      {caption &&
        <span className={"UiButton_caption"}>
          {caption}
        </span>
      }
    </button>
  );
};