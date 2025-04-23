import React, {FC, useState} from 'react';
import styles from './Sorter.module.scss'
import {UiButton, UiCheckbox} from "@/components/ui";

interface SorterPopupProps {
  items: string[];
  selectedId: number;
  onSelect : (id: number) => void;
}

const SorterPopup: FC<SorterPopupProps> = ({
  items,
  selectedId,
  onSelect
}) => {
  const [checkedId, setCheckedId] = useState(selectedId);

  return (
    <div className={styles.SorterPopup_content}>
      <div className={styles.SorterPopup_title}>
        <h2>С чего начнём?</h2>
      </div>
      <ul>
        {items.map((item, index) =>
          <li
            className={styles.SorterPopup_item}
            key={index}
          >
            <UiCheckbox
              isChecked={checkedId === index}
              onChecked={() => setCheckedId(index)}
              caption={item}
            />
          </li>
        )}
      </ul>
      <div className={styles.SorterPopup_button}>
        <UiButton
          caption={"Показать"}
          size="l"
          isFullWidth={true}
          onClick={() => onSelect(checkedId)}
        />
      </div>
    </div>
  );
};

export default SorterPopup;