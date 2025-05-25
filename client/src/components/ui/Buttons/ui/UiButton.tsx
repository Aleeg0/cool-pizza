import {memo, forwardRef} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'
import {UiButtonProps} from "../lib/props";

const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>((
  {
    caption,
    icon,
    iconSize = "m",
    iconPosition = "left",
    type = "primary",
    size = "m",
    isFullWidth = false,
    isIconAnimated = false,
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
        isFullWidth && styles.UiButton_fullWidth,
        icon && styles.UiButton_withIcon
      )}
      {...props}
    >
      {icon && iconPosition === "left" &&
        <span className={cn(
          styles.UiButton_iconLeft,
          `UiKit_icon-${iconSize}`,
          isIconAnimated && styles.UiButton_iconAnimated
        )}>
          {icon}
        </span>
      }
      {caption &&
        <span>
          {caption}
        </span>
      }
      {icon && iconPosition === "right" &&
          <span className={cn(
            styles.UiButton_iconRight,
            `UiKit_icon-${iconSize}`,
            isIconAnimated && styles.UiButton_iconAnimated
          )}>
          {icon}
        </span>
      }
    </button>
  );
});

UiButton.displayName = 'UiButton';
export default memo(UiButton);