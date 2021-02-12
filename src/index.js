import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

import App from "./App"

import store from "./store"

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
