import { LOADER_SHOW_HIDE, IS_ERROR } from "./types"

const initialState = {
    isLoaded: false,
    loadError: null
}
export const appReduser = (state = initialState, action)=>{
    switch(action.type){
        case LOADER_SHOW_HIDE: return{
            ...state, isLoaded: true
        }
        case IS_ERROR: return{
            ...state, loadError: action.payload
        }
        default: return state
    }
}