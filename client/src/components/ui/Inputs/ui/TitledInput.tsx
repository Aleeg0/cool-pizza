'use client';

import React, {FC} from 'react';
import styles from './Input.module.scss'
import {TitledInputProps} from "@/components/ui/Inputs/lib/props";
import {cn} from "@/utils";


export const TitledInput: FC<TitledInputProps> = ({
  value,
  onChange,
  title,
  error = undefined,
  type = 'text',
  placeholder = undefined,
}) => {

  return (
    <div className={styles.TitledInput_container}>
      <div className={styles.TitledInput_caption}>
        {title}
      </div>
      <div className={cn(
        styles.TitledInput_input__container,
        error && styles.TitledInput_inputWarning
      )}>
        <div className={styles.TitledInput_input__content}>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.TitledInput_input__warning}>
          {error}
        </div>
      </div>
    </div>
  );
};