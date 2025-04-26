import React, {FC} from 'react';
import styles from "./RadioSelector.module.scss";

interface Props {
  caption: string,
  onSelect?: () => void,
  disabled?: boolean,
}

export const RadioSelector: FC<Props> = ({caption, onSelect, disabled}) => {

  return (
    <label
      className={styles.RadioSelector_root}
    >
      <input
        className={styles.RadioSelector_input}
        type="radio"
        name="radio-selector"
        onChange={onSelect}
        disabled={disabled}
      />
      <span className={styles.RadioSelector_caption}>
        {caption}
      </span>
    </label>
  );
};