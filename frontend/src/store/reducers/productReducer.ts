import {
  ProductActionTypes,
  type ProductAction,
  type ProductState,
} from "../../types/product";

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

export const productReducer = (
  state = initialState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return { ...state, loading: true, error: null };
      
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { 
        loading: false, 
        error: null, 
        data: action.payload  // payload — массив
      };
      
    case ProductActionTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
      
    case ProductActionTypes.FETCH_PRODUCT_BY_ID:
      return { ...state, loading: true, error: null };

    case ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      // ✅ Защита от null
      const currentData = state.data ?? [];
      
      // Проверяем, есть ли уже этот товар
      const existingProduct = currentData.find(p => p.id === action.payload.id);
      if (existingProduct) {
        return { ...state, loading: false, error: null };
      }
      
      return {
        loading: false,
        error: null,
        data: [...currentData, action.payload],
      };

    case ProductActionTypes.FETCH_PRODUCT_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};