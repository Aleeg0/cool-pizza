import React, {FC} from 'react';
import {cn} from "@/utils";
import styles from './Categories.module.scss';
import {Category} from "@/store/types/Category";
import {UUID} from "@/store/types/shared";

interface Props {
  categories: Category[];
  selectedId: UUID;
  onSelect: (item: Category) => void;
}

const CategoriesPopup: FC<Props> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  return (
    <div className={styles.CategoriesPopup_options}>
      {categories.map((item, i) =>
        <button
          className={cn(
            styles.CategoriesPopup_option,
            selectedId === item.id ? styles.CategoriesPopup_option__active : ''
          )}
          onClick={() => onSelect(item)}
          key={i}
        >
          {item.value}
        </button>
      )}
    </div>
  );
};

export default CategoriesPopup;