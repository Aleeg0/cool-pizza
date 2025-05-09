import React, {FC} from 'react';
import {TitledMultiInputProps} from "../props";
import styles from "../inputs.module.scss";

const TitledMultilineInput: FC<TitledMultiInputProps> = ({
  title,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.TitledMultilineInput_root}>
      <textarea
        className={styles.TitledMultilineInput_input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={400}
        {...props}
      />
    </div>
  );
};

export default TitledMultilineInput;