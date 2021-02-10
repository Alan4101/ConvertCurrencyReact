import {
  FETCH_UA_CURRENCY,
  FETCH_FOREIGN_CURRENCY,
  CHANGE_BASE,
  CHANGE_CONVERT,
  CHANGE_AMOUNT,
} from "./types"

const initialState = {
  foreignCurrency: [],
  uaCurrency: [],
  amount: 0,
  base: "USD",
  convertTo: "EUR",
  result: null,
  date: "",
  oneRate: "",
  currencies: ["USD", "EUR", "PLN", "CZK", "RUB"],
}

export const currencyReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UA_CURRENCY:
      return {
        ...state,
        uaCurrency: action.payload,
      }
    case FETCH_FOREIGN_CURRENCY:
      return {
        ...state,
        foreignCurrency: action.payload,
        date: action.payload.date,
        result: action.payload.rates[state.convertTo] * state.amount,
        oneRate: action.payload.rates[state.convertTo],
      }
    case CHANGE_BASE:
      return {
        ...state,
        base: action.payload.base_value,
      }
    case CHANGE_CONVERT:
      return {
        ...state,
        convertTo: action.payload.convert_value,
      }
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount_value,
        result:
          action.payload.rates[state.convertTo] * action.payload.amount_value,
      }
    default:
      return state
  }
}
