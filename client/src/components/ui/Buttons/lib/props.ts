import {ButtonHTMLAttributes, ReactNode} from "react";

export type ButtonVariation = 'primary' | 'secondary';
export type ButtonSize = 's' | 'm' | 'l';
export type IconPosition = 'left' | 'right';

export interface TextButtonProps {
  caption: string;
}

export interface UiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TextButtonProps {
  variation?: ButtonVariation;
  size?: ButtonSize;
  icon?: ReactNode;
  iconSize?: ButtonSize;
  iconPosition?: IconPosition;
  isFullWidth?: boolean;
}

export interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TextButtonProps {
  withAnimation?: boolean;
}