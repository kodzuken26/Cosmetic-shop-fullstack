export const CATEGORY_ID_MAP = {
    'uhod-za-licom': 1,
    'uhod-za-volosami': 2,
    'uhod-za-telom': 3,
    'kosmetika': 4,
    'aksessuary': 5,
} as const;

export type CategorySlug = keyof typeof CATEGORY_ID_MAP;