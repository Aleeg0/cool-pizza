import {FC, memo} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'
import {AnimatedButtonProps} from "../lib/props";

const InlineButton : FC<AnimatedButtonProps> = ({onClick, caption, withAnimation = false}) => {
  return (
    <button
      className={cn(
        styles.InlineButton_root,
        withAnimation ? styles.InlineButton_animated : '',
      )}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};

export default memo(InlineButton);