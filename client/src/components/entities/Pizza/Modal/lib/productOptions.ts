interface Option {
  id: number;
  value: string;
  disabled: boolean;
}

export const createSizeOptions = (
  sizes: number[]
): Option[] => (
  sizes.map((size, index) => ({
    id: index,
    value: String(size),
    disabled: false
  }))
);

export const createDoughOptions = (
  doughs: string[],
  availableDoughs: string[]
): Option[] => (
  doughs.map((dough, index) => ({
    id: index,
    value: dough,
    disabled: !availableDoughs.includes(dough)
  }))
);