import React, {FC} from 'react';
import styles from './UiCheckbox.module.scss';

interface CheckboxProps {
  isChecked : boolean;
  onChecked: () => void;
  caption?: string;
}

export const UiCheckbox: FC<CheckboxProps> = ({isChecked, onChecked, caption}) => {
  return (
    <label className={styles.UiCheckbox_root}>
      <div
        className={styles.UiCheckbox_container}
      >
        <input
          className={styles.UiCheckbox_input}
          type="checkbox"
          checked={isChecked}
          onChange={onChecked}
        />
        <div className={styles.UiCheckbox_checkbox}>
          <svg
            className={styles.UiCheckbox_checkmark}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 5.2L3.57143 8L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </div>
      </div>
      {caption &&
        <span className={styles.UiCheckbox_caption}>
          {caption}
        </span>
      }
    </label>
  );
};