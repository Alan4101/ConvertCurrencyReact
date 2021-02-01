import { combineReducers } from "redux"
import { fetchForeignCurrencyReduser } from "./fetchForeignCurrencyReduser"

export const rootReduser = combineReducers({
  fetchforeignCurrency: fetchForeignCurrencyReduser,
});
