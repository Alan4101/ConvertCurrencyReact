import axios from "axios"

import configAPI from "../components/configAPI"

import {
  FETCH_FOREIGN_CURRENCY,
  FETCH_UA_CURRENCY,
  IS_ERROR_HIDE,
  IS_ERROR_SHOW,
  LOADER_HIDE,
  LOADER_SHOW,
} from "./types"

export function loaderHide() {
  return {
    type: LOADER_HIDE,
  };
}
export function loaderShow() {
  return {
    type: LOADER_SHOW,
  };
}
export function errorHide() {
  return {
    type: IS_ERROR_HIDE,
  };
}
export function errorShow(text) {
  return {
    type: IS_ERROR_SHOW,
    payload: text
  };
}
export function fetchUACurrency() {
  return async (dispatch) => {
    try{
      dispatch(loaderShow())
      const response = await axios.get(configAPI.API_PRIVATBANK)
      dispatch({ type: FETCH_UA_CURRENCY, payload: response.data })
      dispatch(loaderHide())
      // dispatch(errorHide())
    }catch(err){
      dispatch(errorShow(err))
    }
    
  };
}
export function fetchForeignCurrency() {
  return async (dispatch) => {
    const responce = await axios.get(configAPI.API_EXCHANGE)
    dispatch({ type: FETCH_FOREIGN_CURRENCY, payload: responce.data })
  };
}
