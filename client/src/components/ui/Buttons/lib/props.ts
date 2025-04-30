import {ButtonHTMLAttributes, ReactNode} from "react";

export type ButtonType = 'primary' | 'secondary' | 'primaryLight';
export type ButtonSize = 's' | 'm' | 'l';
export type IconPosition = 'left' | 'right';

export interface TextButtonProps {
  caption: string;
}

export interface UiButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, TextButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
  iconSize?: ButtonSize;
  iconPosition?: IconPosition;
  isFullWidth?: boolean;
}

export interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, TextButtonProps {
  withAnimation?: boolean;
}