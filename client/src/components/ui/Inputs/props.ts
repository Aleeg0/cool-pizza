import React, {InputHTMLAttributes, TextareaHTMLAttributes} from "react";

export interface BasicInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export interface IconInputProps extends BasicInputProps {
  icon?: React.ReactNode;
}

export interface TitledInputProps extends BasicInputProps {
  title: string;
}

export interface TitledErrorInputProps extends TitledInputProps {
  error?: string;
}

export interface TitledErrorDropdownInputProps extends TitledErrorInputProps {
  suggestions: string[];
  onSelectSuggestionAction: (value: string) => void;
}

export interface MultiInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export interface TitledMultiInputProps extends MultiInputProps {
  title: string;
}