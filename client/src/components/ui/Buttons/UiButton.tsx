import React, {FC} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'


interface ButtonProps {
  caption?: string;
  icon?: React.ReactNode;
  iconSize?: "s" | "m" | "l";
  type?: "primary" | "secondary";
  size?: "s" | "m" | "l"
  onClick?: () => void;
  isFullWidth?: boolean;
  ref?: React.Ref<HTMLButtonElement | null>;
}

export const UiButton : FC<ButtonProps> = ({
  caption,
  icon,
  iconSize = "m",
  type = "primary",
  size = "m",
  onClick,
  isFullWidth = false,
  ref
}) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        styles.UiButton_root,
        styles[`UiButton_${type}`],
        styles[`UiButton-${size}`],
        isFullWidth ? styles.UiButton_fullWidth : ''
      )}
    >
      {icon &&
        <span className={cn(
          styles.UiButton_icon,
          `UiKit_icon-${iconSize}`,
        )}>
          {icon}
        </span>
      }
      {caption &&
        <span>
          {caption}
        </span>
      }
    </button>
  );
};