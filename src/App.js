import React from "react"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios"
import { useGameDispatchContext } from "./actions/gameReducer"
import Layout from "./components/Layout"

import Home from "./views/Home"
import Play from "./views/Play"

export default function App({ currencySymbol, language }) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState({})
  // const apiUrl = "https://play.penhaligons.com"
  const apiUrl = "https://lartisan.wildishandco.co.uk"
  const dispatch = useGameDispatchContext()

  React.useEffect(() => {
    dispatch({ type: "UPDATE_CURRENCY", currency: currencySymbol })
  }, [])

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/content`)
      .then((res) => {
        setData(res)
        setLoading(false)
        // dispatch({
        //   type: "UPDATE_GAME_OPEN",
        //   open: res?.data?.data?.block?.on,
        // })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
  }, [])

  console.log(data)

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
