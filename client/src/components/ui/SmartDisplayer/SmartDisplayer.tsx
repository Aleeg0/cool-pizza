import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {CircleIcon} from "@/components/icons";
import {cn} from "@/utils";


interface Props {
  sizeId: number;
  imgUrl: string;
}

export const SmartDisplayer: FC<Props> = ({
  sizeId,
  imgUrl
}) => {

  return (
    <div className={styles.container}>
      <div
        data-size={sizeId}
        className={cn(
          styles.image
        )}>
        <img
          src={imgUrl}
          alt=""
        />
      </div>

      {sizeId < 1 &&
        <div className={cn(
          styles.circle,
          styles.circleM
        )}>
          <CircleIcon size={300}/>
        </div>
      }
      {sizeId < 2 &&
        <div className={cn(
          styles.circle,
          styles.circleL
        )}>
          <CircleIcon size={382}/>
        </div>
      }
    </div>
  );
};