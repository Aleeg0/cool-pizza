import React, {FC} from 'react';
import styles from '../Filtration.module.scss';
import {NumericInput} from "@/components/ui/Input";
import {PriceIcon} from "@/components/icons";
import {PriceRange} from "../types";

interface Props {
  currentPrice: PriceRange;
  onPriceChange: (price: PriceRange) => void;
}

const PriceFilter: FC<Props> = ({
  currentPrice,
  onPriceChange,
}) => {

  const handleMinChange = (value: number) => {
    const newPrice = { ...currentPrice, min: value };
    onPriceChange(newPrice); // Отправляем обновление сразу
  };

  const handleMaxChange = (value: number) => {
    const newPrice = { ...currentPrice, max: value };
    onPriceChange(newPrice);
  };


  return (
    <div className={styles.PriceFilter_content}>
      <NumericInput
        value={currentPrice.min}
        onChange={handleMinChange}
        icon={<PriceIcon/>}
      />
      <NumericInput
        value={currentPrice.max}
        onChange={handleMaxChange}
        icon={<PriceIcon/>}
      />
    </div>
  );
};

export default PriceFilter;