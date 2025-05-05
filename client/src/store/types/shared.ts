export enum LoadingStatus {
  IDLE = 'idle',
  PENDING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export type UUID = string;

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface Filters {
  priceRange: PriceRange;
  ingredientsIds: UUID[];
}