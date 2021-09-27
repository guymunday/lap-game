import React from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import Shelf from "../components/Shelf"
import TermsAndAudio from "../components/TermsAndAudio"

const HomeStyles = styled.div`
  padding: 20px;
  margin: auto;
  .home-inner {
    max-width: 580px;
    min-height: 400px;
    > *:not(:last-child) {
      margin-bottom: 20px;
    }
    p {
      @media (max-width: 500px) {
        max-width: 300px;
      }
    }
  }
`

export default function Home() {
  const [cookies, setCookie] = useCookies(["playAttempts"])

  return (
    <>
      <HomeStyles className="content-flex">
        <div className="home-inner content-flex">
          <h1>
            PAIR A<br className="hide-large" /> BOTANICAL
          </h1>
          <p>
            FIND AS MANY MATCHING CARDS AS YOU CAN IN A MINUTE TO WIN A PRIZE
            FROM ONE OF OUR PRIZE CATEGORIES, BRONZE, SILVER OR GOLD
          </p>
          <Shelf />
          <Link to="/play" className="button">
            {parseInt(cookies.playAttempts, 10) <= 0
              ? "Come back tomorrow"
              : "Play"}
          </Link>
        </div>
        <TermsAndAudio />
      </HomeStyles>
    </>
  )
}
