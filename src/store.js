import { createStore, compose, applyMiddleware } from "redux"
import { rootReduser } from "./redux/rootReduser"
import thunk from "redux-thunk"

const store = createStore(
  rootReduser,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
export default store
