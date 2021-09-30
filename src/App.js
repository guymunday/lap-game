import React from "react"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios"
import { useGameDispatchContext } from "./utils/gameReducer"
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
    dispatch({ type: "UPDATE_LANGUAGE", language: language })
    dispatch({ type: "UPDATE_API_URL", url: apiUrl })
  }, [])

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/content`)
      .then((res) => {
        setData(res?.data?.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
  }, [])

  const block =
    !loading &&
    data?.block.filter(
      (filteredData) => filteredData?.country_code === language
    )

  const cart =
    !loading &&
    data?.cart.filter((filteredData) => filteredData?.country_code === language)

  const home =
    !loading &&
    data?.home.filter((filteredData) => filteredData?.country_code === language)

  const notries =
    !loading &&
    data?.notries.filter(
      (filteredData) => filteredData?.country_code === language
    )

  const settings =
    !loading &&
    data?.settings.filter(
      (filteredData) => filteredData?.country_code === language
    )

  const result =
    !loading &&
    data?.result.filter(
      (filteredData) => filteredData?.country_code === language
    )

  const filteredData = { block, cart, home, notries, settings, result }

  React.useEffect(() => {
    if (data && !loading) {
      dispatch({
        type: "UPDATE_GAME_OPEN",
        open: `${block[0]?.widgets?.game_on}`,
      })
      dispatch({
        type: "UPDATE_TRIES",
        tries: settings[0]?.widgets?.total_tries,
      })
    }
  }, [data, loading])

  return (
    <>
      <Router>
        <Layout data={filteredData}>
          <Switch>
            <Route exact path="/">
              <Home data={filteredData} />
            </Route>
            <Route path="/play">
              <Play data={filteredData} />
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
