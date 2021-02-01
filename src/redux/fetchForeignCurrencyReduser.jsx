import { FETCH_UA_CURRENCY } from "./types";

const initialState = {
  foreignCurrency: [],
  uaCurrency: [],
  isLoaded: false,
  amount: "",
};

export const fetchForeignCurrencyReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UA_CURRENCY:
      return {
        ...state,
        uaCurrency: action.payload,
      };
    default:
      return state
  }
};
