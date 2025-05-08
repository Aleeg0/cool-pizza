import React, {InputHTMLAttributes} from "react";

export interface BasicInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: string;
  error?: string;
}

export interface IconInputProps extends BasicInputProps {
  icon?: React.ReactNode;
}

export interface NumericInputProps extends BasicInputProps {
  min?: number;
  max?: number;
  maxDigits?: number;
}