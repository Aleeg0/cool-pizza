'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Portal} from "@/components/layout";
import {cn} from "@/utils";
import {SortIcon} from "@/components/icons";
import {InlineButton} from "@/components/ui";
import SorterPopup from "./SorterPopup";
import styles from './Sorter.module.scss'
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {selectSortBy} from "@/store/model/Products/selectors";
import {setSortBy} from "@/store/model/Products";
import {sortOptions} from "./lib";
import {useRouter, useSearchParams} from "next/navigation";
import {SortByValues} from "@/store/consts/SortByValues";

const Sorter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = useAppSelector(selectSortBy);
  const dispatch = useAppDispatch();

  // synchronize when mounting
  useEffect(() => {
      const urlSortBy = searchParams.get('sortBy');
      if (urlSortBy && urlSortBy !== sortBy) {
        dispatch(setSortBy(urlSortBy));
      }
    }, []);

  const onSelect = (value: string) => {
    // closing popup and change value
    setIsOpen(false);
    dispatch(setSortBy(value));

    // update url string
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // if default value remove from url
    if (value === SortByValues.NEWEST) {
      newSearchParams.delete('sortBy');
    }
    else {
      newSearchParams.set("sortBy", value);
    }

    router.push(`?${newSearchParams.toString()}`, {scroll: false});
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