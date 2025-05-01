'use client';
import React, {FC, useRef, useState} from 'react';
import {Portal} from "@/components/layout";
import {cn} from "@/utils";
import {SortIcon} from "@/components/icons";
import {InlineButton} from "@/components/ui";
import SorterPopup from "./SorterPopup";
import styles from './Sorter.module.scss'
import {sortOptions} from "./lib";

interface Props {
  onSortChange: (sortBy: string) => void;
  sortBy: string;
}

const Sorter: FC<Props> = ({onSortChange, sortBy}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const onSelect = (value: string) => {
    setIsOpen(false);
    onSortChange(value);
  }

  const sortByName = sortOptions.find(sortOption => sortOption.value === sortBy)?.name ?? "";

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
        caption={sortByName}
        onClick={() => setIsOpen(!isOpen)}
        withAnimation={true}
      />

      {isOpen &&
        <Portal
            onClose={() => setIsOpen(false)}
            triggerRef={anchorRef}
        >
          <SorterPopup
              items={sortOptions}
              selectedValue={sortBy}
              onSelect={onSelect}
          />
        </Portal>
      }
    </div>
  );
};

export default Sorter;