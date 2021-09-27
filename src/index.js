import React from "react"
import ReactDOM from "react-dom"
import { Helmet } from "react-helmet"
import { createGlobalStyle } from "styled-components"
import Footer from "./components/Footer"
import Header from "./components/Header"
import App from "./App"
import useQueryString from "./actions/query-string/useQueryString"
import { GlobalProvider } from "./actions/gameReducer"

//CSS
import "./styles/reset.css"
import "./styles/lap-fonts.css"
import { global } from "./styles/global"

const GlobalStyles = createGlobalStyle`
${global}
`

export default function Root() {
  const [currency, setCurrency] = useQueryString("currency", "GBP")
  const [language, setLanguage] = useQueryString("language", "en")
  const currencySymbol =
    currency === "EUR" || currency === "eur"
      ? "€"
      : currency === "USD" || currency === "usd"
      ? "$"
      : "£"

  return (
    <>
      <GlobalProvider>
        <Helmet>
          <title>
            {currencySymbol + ", " + language} | L'Artisan Parfumeur
          </title>
        </Helmet>
        <GlobalStyles />
        <Header />
        <main>
          <App currencySymbol={currencySymbol} language={language} />
        </main>
        <Footer />
      </GlobalProvider>
    </>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
