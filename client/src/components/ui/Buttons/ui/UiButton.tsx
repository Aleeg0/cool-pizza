import React, {forwardRef} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'
import {UiButtonProps} from "../lib/props";

export const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>((
  {
    caption,
    icon,
    iconSize = "m",
    type = "primary",
    size = "m",
    isFullWidth = false,
    ...props
  },
  ref
) => {
  return (
    <button
      ref={ref}
      className={cn(
        styles.UiButton_root,
        styles[`UiButton_${type}`],
        styles[`UiButton-${size}`],
        isFullWidth ? styles.UiButton_fullWidth : ''
      )}
      {...props}
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
});

UiButton.displayName = 'UiButton';