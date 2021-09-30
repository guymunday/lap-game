import React from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../utils/gameReducer"
import Shelf from "../components/Shelf"
import TermsAndAudio from "../components/TermsAndAudio"
import homeImage from "../assets/images/lap-home-image.png"

const HomeStyles = styled.div`
  padding: 60px 20px;
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

export default function Home({ data }) {
  const [cookies, setCookie] = useCookies(["playAttempts"])
  const { url, language } = useGameStateContext()
  const dispatch = useGameDispatchContext()

  const handlePlayClick = () => {
    dispatch({ type: "UPDATE_AUDIO", audio: true })
  }

  return (
    <>
      <HomeStyles className="content-flex">
        <div className="home-inner content-flex">
          <h1>{data?.home[0]?.widgets?.title}</h1>
          {parseInt(cookies.playAttempts, 10) <= 0 ? (
            <p>{data?.notries[0]?.widgets?.text}</p>
          ) : (
            <p>{data?.home[0]?.widgets?.text}</p>
          )}
          <div className="product-images">
            <div className="product-image-wrapper">
              <img
                src={
                  `${url}/api/media/uploads/${data?.home[0]?.widgets?.desktop_image?.name}` ||
                  homeImage
                }
                alt=""
              />
            </div>
          </div>
          <Shelf />
          {parseInt(cookies.playAttempts, 10) <= 0 ? (
            <a
              href={`https://www.artisanparfumeur.${
                language === "FR" ? "fr" : "com"
              }`}
              className="button"
            >
              {data?.notries[0]?.widgets?.btn_text}
            </a>
          ) : (
            <Link to="/play" className="button" onClick={handlePlayClick}>
              {data?.home[0]?.widgets?.btn_text}
            </Link>
          )}
        </div>
        <TermsAndAudio data={data} />
      </HomeStyles>
    </>
  )
}
