import React, {FC} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'
import {AnimatedButtonProps} from "../lib/props";

export const InlineButton : FC<AnimatedButtonProps> = ({onClick, caption, withAnimation = false}) => {
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