import React from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import Shelf from "../components/Shelf"
import TermsAndAudio from "../components/TermsAndAudio"
import productOne from "../assets/images/lap-candle.png"
import productTwo from "../assets/images/lap-bottle.png"
import productThree from "../assets/images/lap-wrap.png"

const HomeStyles = styled.div`
  padding: 60px 20px;
  margin: auto;
  .home-inner {
    max-width: 580px;
    min-height: 400px;
    overflow: hidden;
    > *:not(:last-child) {
      margin-bottom: 20px;
    }
    p {
      @media (max-width: 500px) {
        max-width: 300px;
      }
    }
    .product-images {
      display: flex;
      width: 300px;
      margin-bottom: -37px;
      z-index: 2;
      .product-image-wrapper {
        flex: 1;
        display: flex;
        align-items: flex-end;
        padding: 0 10px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
    a {
      margin-top: 30px;
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
          <div className="product-images">
            <div className="product-image-wrapper">
              <img src={productOne} alt="" />
            </div>
            <div className="product-image-wrapper">
              <img src={productTwo} alt="" />
            </div>
            <div className="product-image-wrapper">
              <img src={productThree} alt="" />
            </div>
          </div>
          <Shelf />
          {parseInt(cookies.playAttempts, 10) <= 0 ? (
            <h2 style={{ marginTop: 30 }}>Come back tomorrow</h2>
          ) : (
            <Link to="/play" className="button">
              Play
            </Link>
          )}
        </div>
        <TermsAndAudio />
      </HomeStyles>
    </>
  )
}
