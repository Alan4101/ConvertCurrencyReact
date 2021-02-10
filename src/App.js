import "./App.css"
import React from "react"

import Home from "./components/pages/Home"

function App() {
  return (
    <Home />
    // <BrowserRouter>
    //   <NavComponent />
    //   <Switch>
    //     <Route path={"/"} exact component={Home} />
    //     <Route path={"/converter"} component={Converter} />
    //   </Switch>
    // </BrowserRouter>
  )
}

export default App
