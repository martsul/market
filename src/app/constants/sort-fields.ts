import { SortFields } from '../types/sort-fields';

export const SORT_FIELDS: SortFields = {
  'Most expensive': {
    order: 'desc',
    sortBy: 'price',
  },
  Cheapest: {
    order: 'asc',
    sortBy: 'price',
  },
};
