import axios from "axios"

import configAPI from "../components/configAPI"

import { FETCH_FOREIGN_CURRENCY, FETCH_UA_CURRENCY } from "./types"

export function fetchUACurrency() {
  return async (dispatch) => {
    const response = await axios.get(configAPI.API_PRIVATBANK)
    dispatch({ type: FETCH_UA_CURRENCY, payload: response.data })
  };
}
export function fetchForeignCurrency() {
  return async (dispatch) => {
    const responce = await axios.get(configAPI.API_EXCHANGE)
    dispatch({ type: FETCH_FOREIGN_CURRENCY, payload: responce.data })
  };
}
