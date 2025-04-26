import React from 'react';
import {RadioSelector} from "@/components/ui";
import styles from './styles.module.scss';

interface RadioItem {
  id: number;
  value: string;
  isExist: boolean;
}

interface Props<T extends RadioItem> {
  items: T[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const RadioSlideSelector = <T extends RadioItem>({
  items,
  selectedId,
  onSelect,
}: Props<T>) => {
  const width = 100 / items.length;
  const translate = selectedId * 100;

  return (
    <div className={styles.RadioSelectorGroup_content}>
      <div
        className={styles.RadioSelectorGroup_active}
        style={{
          width: `${width}%`,
          transform: `translateX(${translate}%)`,
        }}
      />
      {items.map((item) => (
        <RadioSelector
          key={item.id}
          caption={item.value}
          onSelect={() => onSelect(item.id)}
          disabled={!item.isExist}
        />
      ))}
    </div>
  );
};

export default RadioSlideSelector;