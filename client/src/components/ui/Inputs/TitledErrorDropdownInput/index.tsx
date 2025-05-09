'use client';

import React, {FC, useRef, useState} from 'react';
import {TitledErrorDropdownInputProps} from "../props";
import styles from '../inputs.module.scss';
import {useClickOutside} from "@/hooks";
import {TitledErrorInput} from "@/components/ui";


const TitledErrorDropdownInput: FC<TitledErrorDropdownInputProps> = ({
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
  console.log(props.error)

  return (
    <div className={styles.TitledErrorDropdownInput_container}>
      <TitledErrorInput
        onFocus={() => setIsOpen(!isOpen)}
        {...props}
      />
      {isOpen && suggestions.length > 0 &&
        <ul
          ref={listRef}
          className={styles.TitledErrorDropdownInput_suggestions}
        >
          {suggestions.map((item, i) =>
            <li
              className={styles.TitledErrorDropdownInput_suggestion}
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

export default TitledErrorDropdownInput;