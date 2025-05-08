'use client';

import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from './Input.module.scss';
import {NumericInputProps, IconInputProps} from "@/components/ui/Inputs/lib/props";

type Props = Omit<NumericInputProps & IconInputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

export const NumericInput: FC<Props> = ({
  onChange,
  maxDigits = 4,
  icon,
  className = '',
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // для синхронизации с передаваемым value
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Проверка на максимальное количество цифр
    if (maxDigits && newValue.length > maxDigits) {
      return;
    }

    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`${styles.NumericInput_container} ${className}`}>
      <div className={styles.NumericInput_content}>
        <input
          type="number"
          className={styles.NumericInput_input}
          onChange={handleChange}
          value={inputValue}
          {...props}
        />
        {icon && (
          <span className={styles.NumericInput_icon}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};