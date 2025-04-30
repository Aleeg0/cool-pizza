'use client';

import React, {FC, useState} from 'react';
import styles from './Input.module.scss'
import {SearchIcon} from "@/components/icons";
import {cn} from "@/utils";

interface InputProps {

}

export const Input : FC<InputProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={cn(
      styles.UiInput_root,
      isFocused ? styles.UiInput_focused : ''
    )}>
      <div className={styles.UiInput_container}>
        <div className={styles.UiInput_content}>
          <div className={cn(
            styles.UiInput_icon,
            "UiKit_icon__l"
          )}>
            <SearchIcon/>
          </div>
          <div className={styles.UiInput_input}>
            <input
              placeholder="Поиск пицц"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(inputValue !== "")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};