import React, {FC, useState} from 'react';
import styles from './Sorter.module.scss'
import {UiButton, UiCheckbox} from "@/components/ui";
import {SortOption} from "./lib";

interface SorterPopupProps {
  items: SortOption[];
  selectedValue: string;
  onSelect : (value: string) => void;
}

const SorterPopup: FC<SorterPopupProps> = ({
  items,
  selectedValue,
  onSelect
}) => {
  const [checkedId, setCheckedId] = useState<string>(selectedValue);

  return (
    <div className={styles.SorterPopup_content}>
      <div className={styles.SorterPopup_title}>
        <h2>С чего начнём?</h2>
      </div>
      <ul>
        {items.map((sortOption, index) =>
          <li
            className={styles.SorterPopup_item}
            key={index}
          >
            <UiCheckbox
              isChecked={checkedId === sortOption.value}
              onChecked={() => setCheckedId(sortOption.value)}
              caption={sortOption.name}
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