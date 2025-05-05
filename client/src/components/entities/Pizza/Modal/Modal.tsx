'use client';

import React, {useState, useEffect} from 'react';
import { RadioSlideSelector } from "@/components/features";
import styles from './styles.module.scss';
import { IngredientCatalog } from "@/components/entities/Ingredient";
import { ProductModal } from "@/components/entities/Product";
import { SmartDisplayer } from "@/components/ui";
import {useProductVariations} from "./lib/useProductVariations";
import {createDoughOptions, createSizeOptions} from "@/components/entities/Pizza/Modal/lib/productOptions";
import {Pizza, Product} from "@/store/types/Product";
import {UUID} from "@/store/types/shared";
import {addPizzaToCart} from "@/store/model/Cart";
import {useAppDispatch} from "@/store/lib/hooks";

interface PizzaModalProps {
  product: Product;
}

const PizzaModal: React.FC<PizzaModalProps> = ({ product }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedDoughIndex, setSelectedDoughIndex] = useState(0);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<UUID[]>([]);
  const dispatch = useAppDispatch();

  const toggleIngredient = (ingredientId: UUID) => {
    setSelectedIngredientIds(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const variations = product.variations as Pizza[];
  const {sizes, doughs, getAvailableDoughs, findProduct} = useProductVariations(variations);

  const availableDoughs = getAvailableDoughs(sizes[selectedSizeIndex]);
  const sizeOptions = createSizeOptions(sizes);
  const doughOptions = createDoughOptions(doughs, availableDoughs);

  // корректируем выбранное тесто при изменении размера
  useEffect(() => {
    // если текущее тесто недоступно для нового размера
    if (doughOptions[selectedDoughIndex]?.disabled) {
      // находим первое доступное тесто
      const firstAvailableIndex = doughOptions.findIndex(option => !option.disabled);
      if (firstAvailableIndex >= 0) {
        setSelectedDoughIndex(firstAvailableIndex);
      }
    }
  }, [selectedSizeIndex, doughOptions, selectedDoughIndex]);

  const selectedProduct = findProduct(doughs[selectedDoughIndex], Number(sizeOptions[selectedSizeIndex]?.value)) ?? variations[0];

  const totalPrice = selectedProduct.price + selectedProduct.ingredients
    .filter(ingredient => selectedIngredientIds.includes(ingredient.id))
    .reduce((sum, ingredient) => sum + ingredient.price, 0);

  const onCartButtonClick = () => {
    dispatch(addPizzaToCart({
      pizzaId: selectedProduct.id,
      ingredientsIds: selectedIngredientIds,
    }));
  }

  const productDetails = `${selectedProduct.size} см, ${selectedProduct.dough} тесто, ${selectedProduct.weight} г`;

  return (
    <ProductModal
      title={product.name}
      description={product.description}
      productDetails={productDetails}
      cartButtonCaption={`Добавить в корзину за ${totalPrice.toFixed(2)} ₽`}
      onCartButtonClick={onCartButtonClick}
      imageVisualizer={
        <SmartDisplayer
          sizeId={selectedSizeIndex}
          imgUrl={selectedProduct.imgUrl}
        />
      }
      content={
        <>
          <div className={styles.sliders}>
            <RadioSlideSelector
              items={sizeOptions}
              selectedId={selectedSizeIndex}
              onSelect={setSelectedSizeIndex}
            />
            <RadioSlideSelector
              items={doughOptions}
              selectedId={selectedDoughIndex}
              onSelect={setSelectedDoughIndex}
            />
          </div>
          {selectedProduct.ingredients.length > 0 && (
            <IngredientCatalog
              ingredients={selectedProduct.ingredients}
              selectedIds={selectedIngredientIds}
              onSelect={toggleIngredient}
            />
          )}
        </>
      }
    />
  );
};

export default PizzaModal;