import React, {InputHTMLAttributes} from "react";

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

export interface TitledDropdownInputProps extends TitledInputProps {
  suggestions: string[];
  onSelectSuggestionAction: (value: string) => void;
}