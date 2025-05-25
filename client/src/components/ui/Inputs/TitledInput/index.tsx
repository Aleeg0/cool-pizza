import React, {FC} from 'react';
import UiInput from "../UiInput";
import {TitledInputProps} from "../props";
import styles from '../inputs.module.scss';

const TitledInput: FC<TitledInputProps> = ({
  title,
  ...props
}) => {

  return (
    <div className={styles.TitledInput_container}>
      <div className={styles.TitledInput_title}>
        {title}
      </div>
      <div className={styles.TitledInput_input}>
        <UiInput {...props}/>
      </div>
    </div>
  );
};

export default React.memo(TitledInput);