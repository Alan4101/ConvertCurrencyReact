import { LOADER_SHOW, LOADER_HIDE, IS_ERROR_HIDE, IS_ERROR_SHOW } from "./types"

const initialState = {
    isLoaded: false,
    loadError: null
}
export const appReduser = (state = initialState, action)=>{
    switch(action.type){
        case LOADER_SHOW: return{
            ...state, isLoaded: true
        }
        case LOADER_HIDE: return{
            ...state, isLoaded: false
        }
        case IS_ERROR_HIDE: return{
            ...state, loadError: null
        }
        case IS_ERROR_SHOW: return {
            ...state, loadError: action.payload  
        }
        default: return state
    }
}