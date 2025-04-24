import React, {InputHTMLAttributes} from "react";

export interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export interface NumericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  maxDigits?: number;
}