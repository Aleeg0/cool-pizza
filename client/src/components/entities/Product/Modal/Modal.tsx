import React, {FC, ReactNode} from 'react';
import styles from "./styles.module.scss";
import {UiButton} from "@/components/ui";
import {useRouter} from "next/navigation";

interface Props {
  imageVisualizer: ReactNode;
  content: ReactNode;
  title: string;
  productDetails: string;
  description: string;
  onCartButtonClick: () => void;
  cartButtonCaption: string;
}

const Modal: FC<Props> = ({
  imageVisualizer,
  content,
  title,
  productDetails,
  description,
  onCartButtonClick,
  cartButtonCaption,
}) => {

  const router = useRouter();

  const onClick = () => {
    router.back();
    onCartButtonClick();
  }

  return (
    <div className={styles.content}>
      <div className={styles.productVisualization}>
        {imageVisualizer}
      </div>
      <div className={styles.rightPart}>
        <div className={styles.scrollableContent}>
          <div className={styles.description}>
            <h2>{title}</h2>
            <p>{productDetails}</p>
            <p>{description}</p>
          </div>
          {content}
        </div>
        <div className={styles.cartButton}>
          <UiButton
            caption={cartButtonCaption}
            isFullWidth={true}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;