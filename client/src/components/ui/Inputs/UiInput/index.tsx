import React, {FC} from 'react';
import {cn} from "@/utils";
import {CrossIcon} from "@/components/icons";
import {BasicInputProps} from "../props";
import styles from '../inputs.module.scss';

const UiInput: FC<BasicInputProps> = ({
  value,
  onChange,
  ...props
}) => {

  return (
    <div className={styles.UiInput_container}>
      <div className={styles.UiInput_content}>
        <input
          className={styles.UiInput_input}
          value={value}
          {...props}
          onChange={(e) => onChange(e.target.value)}
        />
        <div
          className={cn(
            styles.UiInput_iconCover,
            value !== "" && styles.UiInput_iconCoverVisible
          )}
          onClick={() => onChange("")}
        >
          <CrossIcon/>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UiInput);