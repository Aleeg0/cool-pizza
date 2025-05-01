import {SortByValues} from "@/store/consts/SortByValues";

export type SortOption = {
  name: string;
  value: string;
};

export const sortOptions: SortOption[] = [
  {
    name: "Новые",
    value: SortByValues.NEWEST
  },
  {
    name: "Дешёвые",
    value: SortByValues.PRICE_ASC
  },
  {
    name: "Дорогие",
    value: SortByValues.PRICE_DESC
  }
];
