import React, {FC, useRef, useState} from 'react';
import {cn} from "@/utils";
import CategoriesPopup from "./CategoriesPopup";
import {Portal} from "@/components/layout";
import styles from "./Categories.module.scss";
import {Category} from "@/store/types/category";
import {UUID} from "@/store/types/shared";

interface Props {
  categories: Category[];
  selectedId: UUID;
  onSelect: (item: Category) => void;
}

const CategoriesDropdown: FC<Props> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onSelectPopupItem = (item: Category) => {
    setIsOpen(false);
    onSelect(item);
  }

  const activeCategory = categories.find(c => c.id === selectedId);
  const buttonText = activeCategory?.value || "Ещё";

  return (
    <li
      className={styles.Categories_item}
    >
      <button
        ref={triggerRef}
        className={cn(
          styles.Categories_button,
          activeCategory ? styles.Categories_button__active : '',
          styles.Categories_dropdownButton
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <span className={styles.Categories_dropdownButton__icon}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.220115 0.22944C0.361098 0.08253 0.552285 4.52696e-07 0.751634 4.43982e-07C0.950983 4.35268e-07 1.14217 0.08253 1.28315 0.22944L5.00454 4.10846L8.72592 0.229439C8.86771 0.0866929 9.05762 0.00770625 9.25474 0.00949199C9.45186 0.0112773 9.64042 0.0936919 9.7798 0.238985C9.91919 0.384278 9.99826 0.580825 9.99997 0.786294C10.0017 0.991761 9.92591 1.18971 9.78896 1.33751L5.53606 5.77056C5.39508 5.91747 5.20389 6 5.00454 6C4.80519 6 4.614 5.91747 4.47302 5.77056L0.220115 1.33751C0.0791754 1.19055 -2.18939e-07 0.991267 -2.28022e-07 0.783473C-2.37105e-07 0.57568 0.0791754 0.376394 0.220115 0.22944Z" fill="black"/>
          </svg>
        </span>
      </button>

      {isOpen &&
        <Portal
            onClose={() => setIsOpen(false)}
            triggerRef={triggerRef}
        >
          <CategoriesPopup
              categories={categories}
              selectedId={selectedId}
              onSelect={onSelectPopupItem}
          />
        </Portal>
      }
    </li>
  );
};

export default CategoriesDropdown;