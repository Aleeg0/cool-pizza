import React, {FC} from 'react';
import TitledInput from "../TitledInput";
import {cn} from "@/utils";
import {TitledErrorInputProps} from "../props";
import styles from '../inputs.module.scss';

const TitledErrorInput: FC<TitledErrorInputProps> = ({
  error,
  ...props
}) => {

  return (
    <div className={styles.TitledInputWithError_container}>
      <div className={styles.TitledInputWithError_input}>
        <TitledInput
          {...props}
        />
      </div>
      <div className={cn(
        styles.TitledInputWithError_error,
        styles.TitledInputWithError_error__active
      )}>
        {error}
      </div>
    </div>
  );
};

export default React.memo(TitledErrorInput);