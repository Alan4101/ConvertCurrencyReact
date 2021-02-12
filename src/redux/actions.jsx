import axios from "axios"

import configAPI from "../components/configAPI"

import {
  CHANGE_BASE,
  FETCH_FOREIGN_CURRENCY,
  FETCH_UA_CURRENCY,
  IS_ERROR_HIDE,
  IS_ERROR_SHOW,
  LOADER_HIDE,
  LOADER_SHOW,
  CHANGE_CONVERT,
  CHANGE_AMOUNT,
} from "./types"

export function loaderHide() {
  return {
    type: LOADER_HIDE,
  }
}
export function loaderShow() {
  return {
    type: LOADER_SHOW,
  }
}
export function errorHide() {
  return {
    type: IS_ERROR_HIDE,
  }
}
export function errorShow(text) {
  return {
    type: IS_ERROR_SHOW,
    payload: text,
  }
}
export function changeBase(base_value) {
  return {
    type: CHANGE_BASE,
    payload: base_value,
  }
}
export function changeConvert(convert_value) {
  return {
    type: CHANGE_CONVERT,
    payload: convert_value,
  }
}
export function changeAmount(amount_value) {
  return {
    type: CHANGE_AMOUNT,
    payload: amount_value,
  }
}
export function fetchUACurrency() {
  return async (dispatch) => {
    try {
      dispatch(loaderShow())
      const responce = await axios.get(configAPI.API_PRIVATBANK)
      responce.data.pop()
      responce.data[2].ccy = "RUB"
      dispatch({ type: FETCH_UA_CURRENCY, payload: responce.data })
      dispatch(loaderHide())
    } catch (err) {
      dispatch(errorShow(err))
    }
  }
}
export function fetchForeignCurrency(base = "USD") {
  return async (dispatch) => {
    try {
      dispatch(loaderShow())
      const responce = await axios.get(`${configAPI.API_EXCHANGE}${base}`)
      dispatch({ type: FETCH_FOREIGN_CURRENCY, payload: responce.data })
      dispatch(loaderHide())
    } catch (err) {
      dispatch(errorShow(err))
    }
  }
}
