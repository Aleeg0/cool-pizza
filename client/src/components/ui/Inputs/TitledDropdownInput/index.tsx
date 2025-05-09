'use client';

import React, {FC, useRef, useState} from 'react';
import TitledInput from "../TitledInput";
import {TitledDropdownInputProps} from "../props";
import styles from '../inputs.module.scss';
import {useClickOutside} from "@/hooks";


const TitledDropdownInput: FC<TitledDropdownInputProps> = ({
  suggestions,
  onSelectSuggestionAction,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null!);
  useClickOutside(listRef, () => setIsOpen(false));

  const onSelect = (value: string) => {
    onSelectSuggestionAction(value);
    setIsOpen(false);
  }

  return (
    <div className={styles.TitledDropdownInput_container}>
      <TitledInput
        onFocus={() => setIsOpen(!isOpen)}
        {...props}
      />
      {isOpen && suggestions.length > 0 &&
        <ul
          ref={listRef}
          className={styles.TitledDropdownInput_suggestions}
        >
          {suggestions.map((item, i) =>
            <li
              className={styles.TitledDropdownInput_suggestion}
              onClick={() => onSelect(item)}
              key={i}
            >
              {item}
            </li>
          )}
        </ul>
      }
    </div>
  );
};

export default TitledDropdownInput;