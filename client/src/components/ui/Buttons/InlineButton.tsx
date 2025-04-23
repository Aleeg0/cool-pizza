import React, {FC} from 'react';
import {cn} from "@/utils";

interface Props {
  onClick: () => void;
  caption?: string;
  withAnimation?: boolean;
}

export const InlineButton : FC<Props> = ({onClick, caption, withAnimation = false}) => {
  return (
    <button
      className={cn(
        "InlineButton_root",
        withAnimation ? "InlineButton_animated" : '',
      )}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};