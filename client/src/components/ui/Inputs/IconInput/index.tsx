import React, {FC} from 'react';
import {IconInputProps} from "../props";
import styles from '../inputs.module.scss';
import {cn} from "@/utils";

const IconInput: FC<IconInputProps> = ({
  icon,
  onChange,
  ...props
}) => {

  return (
    <div className={styles.UiInput_container}>
      <div className={styles.UiInput_content}>
        <input
          className={styles.UiInput_input}
          {...props}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className={cn(
          styles.UiInput_iconCover,
          styles.UiInput_iconCoverVisible
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IconInput);