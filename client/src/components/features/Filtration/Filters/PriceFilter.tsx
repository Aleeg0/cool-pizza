import React, {FC} from 'react';
import styles from '../Filtration.module.scss';
import {NumericInput} from "@/components/ui/Inputs";
import {PriceIcon} from "@/components/icons";
import {PriceRange} from "@/store/types/shared";

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
      <NumericInput
        value={currentPrice.min?.toString() ?? ""}
        onChange={handleMinChange}
        icon={<PriceIcon/>}
        placeholder="0"
      />
      <NumericInput
        value={currentPrice.max?.toString() ?? ""}
        onChange={handleMaxChange}
        icon={<PriceIcon/>}
        placeholder="0"
      />
    </div>
  );
};

export default PriceFilter;