import React, {FC} from 'react';
import styles from '../Filtration.module.scss';
import {PriceIcon} from "@/components/icons";
import {PriceRange} from "@/store/types/shared";
import {IconInput} from "@/components/ui";

interface Props {
  currentPrice: PriceRange;
  onPriceChange: (price: PriceRange) => void;
}

const PriceFilter: FC<Props> = ({
  currentPrice,
  onPriceChange,
}) => {

  const handleMinChange = (value?: string) => {
    onPriceChange({ ...currentPrice, min: value ? Number(value) : undefined });
  };

  const handleMaxChange = (value?: string) => {
    onPriceChange({ ...currentPrice, max: value ? Number(value) : undefined });
  };


  return (
    <div className={styles.PriceFilter_content}>
      <IconInput
        icon={<PriceIcon/>}
        value={currentPrice.min?.toString() ?? ""}
        onChange={handleMinChange}
        placeholder="0"
        type="number"
      />
      <IconInput
        icon={<PriceIcon/>}
        value={currentPrice.max?.toString() ?? ""}
        onChange={handleMaxChange}
        placeholder="0"
        type="number"
      />
    </div>
  );
};

export default PriceFilter;