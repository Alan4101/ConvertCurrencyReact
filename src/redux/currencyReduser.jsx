import { FETCH_UA_CURRENCY, FETCH_FOREIGN_CURRENCY } from "./types";

const initialState = {
  foreignCurrency: [],
  uaCurrency: [],
  amount: "",
};

export const currencyReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UA_CURRENCY:
      return {
        ...state,
        uaCurrency: action.payload,
      };
    case FETCH_FOREIGN_CURRENCY:
      return {
        ...state,
        foreignCurrency: action.payload,
      };
    default:
      return state;
  }
};
