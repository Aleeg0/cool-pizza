'use client';

import React, {useRef, useState} from 'react';
import {Portal} from "@/components/layout";
import {cn} from "@/utils";
import {SortIcon} from "@/components/icons";
import {InlineButton} from "@/components/ui";
import SorterPopup from "./SorterPopup";
import styles from './Sorter.module.scss'

const arr = [
  "рейтинг",
  "дешевое",
  "дорогое"
];

const Sorter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);

  const onSelect = (id: number) => {
    setIsOpen(false);
    setSelectedId(id);
  }

  return (
    <div
      className={styles.Sorter_root}
      ref={anchorRef}
    >
      <span className={cn(
        styles.Sorter_icon,
        "UiKit_icon-l"
      )}>
        <SortIcon/>
      </span>
      <span className={styles.Sorter_title}>
        Сортировка:
      </span>
      <InlineButton
        caption={arr[selectedId]}
        onClick={() => setIsOpen(!isOpen)}
        withAnimation={true}
      />

      {isOpen &&
        <Portal
            onClose={() => setIsOpen(false)}
            triggerRef={anchorRef}
        >
          <SorterPopup
              items={arr}
              selectedId={selectedId}
              onSelect={onSelect}
          />
        </Portal>
      }
    </div>
  );
};

export default Sorter;