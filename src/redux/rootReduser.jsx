import { combineReducers } from "redux"
import { appReduser } from "./appReduser";
import { currencyReduser } from "./currencyReduser"

export const rootReduser = combineReducers({
  currency: currencyReduser,
  loadingAndError: appReduser
});
