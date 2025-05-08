'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Portal} from "@/components/layout";
import {cn} from "@/utils";
import {SortIcon} from "@/components/icons";
import {InlineButton} from "@/components/ui";
import SorterPopup from "./SorterPopup";
import styles from './Sorter.module.scss'
import {sortOptions} from "./lib";
import {SortByValues} from "@/store/consts/SortByValues";
import {setSortBy} from "@/store/model/Products";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {selectSortBy} from "@/store/model/Products";

const Sorter = () => {
  // state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  // redux
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  // rout
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelect = (value: string) => {
    setIsOpen(false);
    handleSortChange(value);
  }

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === SortByValues.NEWEST) {
      newParams.delete('sortBy');
    } else {
      newParams.set('sortBy', value);
    }
    router.push(`?${newParams.toString()}`);
    dispatch(setSortBy(value));
  };

  useEffect(() => {
    const urlSortBy = searchParams.get('sortBy');
    if (urlSortBy) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('sortBy');
      router.push(`?${newParams.toString()}`);
    }
  }, []);

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