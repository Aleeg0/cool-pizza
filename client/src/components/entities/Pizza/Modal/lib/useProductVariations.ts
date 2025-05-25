import { useMemo } from 'react';
import {Pizza} from "@/store/types/Product";

interface UseProductVariationsResult {
  sizes: number[];
  doughs: string[];
  getAvailableDoughs: (size: number) => string[];
  findProduct: (dough: string, size: number) => Pizza;
}

export const useProductVariations = (variations: Pizza[]): UseProductVariationsResult => {

  // получаем уникальные размеры, отсортированные по возростанию
  const sizes = useMemo(() => (
    [...new Set(variations.map(v => v.size))]
      .sort((s1, s2) => s1 - s2)
  ), [variations]);

  // получаем уникальные виды теста, отсортированные по алфавиту
  const doughs = useMemo(() => (
    [...new Set(variations.map(v => v.dough))]
      .sort((d1, d2) => d2.localeCompare(d1))
  ), [variations]);

  // получаем доступные виды теста для выбранного размеры
  const getAvailableDoughs = (size: number) => (
    variations
      .filter(v => v.size === size)
      .map(v => v.dough)
  );

  const findProduct = (dough: string, size: number) => (
    variations.find(v => v.dough === dough && v.size === size)!
  );

  return { sizes, doughs, getAvailableDoughs, findProduct };
};