import React from "react"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { useGameDispatchContext } from "./actions/gameReducer"
import Layout from "./components/Layout"

import Home from "./views/Home"
import Play from "./views/Play"
import ClosedPopup from "./components/ClosedPopup"

export default function App({ currencySymbol, language }) {
  const dispatch = useGameDispatchContext()

  React.useEffect(() => {
    dispatch({ type: "UPDATE_CURRENCY", currency: currencySymbol })
  }, [])

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/play">
              <Play />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  )
}
