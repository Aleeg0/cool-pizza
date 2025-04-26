import React, {FC, ReactNode} from 'react';
import styles from "./styles.module.scss";
import {UiButton} from "@/components/ui";

interface Props {
  imageVisualizer: ReactNode;
  content: ReactNode;
  title: string;
  productProperty: string;
  description: string;
  onCartButtonClick: () => void;
  cartButtonCaption: string;
}

const Modal: FC<Props> = ({
  imageVisualizer,
  content,
  title,
  productProperty,
  description,
  onCartButtonClick,
  cartButtonCaption,
}) => {


  return (
    <div className={styles.content}>
      <div className={styles.productVisualization}>
        {imageVisualizer}
      </div>
      <div className={styles.rightPart}>
        <div className={styles.scrollableContent}>
          <div className={styles.description}>
            <h2>{title}</h2>
            <p>{productProperty}</p>
            <p>{description}</p>
          </div>
          {content}
        </div>
        <div className={styles.cartButton}>
          <UiButton
            caption={cartButtonCaption}
            isFullWidth={true}
            onClick={onCartButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;