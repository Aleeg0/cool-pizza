import React, {FC} from 'react';
import {cn} from "@/utils";
import styles from './Buttons.module.scss'

interface Props {
  onClick: () => void;
  caption?: string;
  withAnimation?: boolean;
}

export const InlineButton : FC<Props> = ({onClick, caption, withAnimation = false}) => {
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