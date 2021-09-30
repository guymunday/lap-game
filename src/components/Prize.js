import React from "react"
import axios from "axios"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import { gsap } from "gsap"
import Popup from "./Popup"
import { useGameStateContext } from "../utils/gameReducer"
import bronzeTexture from "../assets/images/bronze.jpg"
import silverTexture from "../assets/images/silver.jpg"
import goldTexture from "../assets/images/gold.jpg"

const PrizeStyles = styled.div`
  > *:not(last-child) {
    margin-bottom: 20px;
  }
  h1 {
    font-family: var(--akkurat);
    text-transform: uppercase;
  }
  .prize-prizes {
    border: 1px solid #000;
    padding: 10px;
    .prize-texture-container {
      display: flex;
      justify-content: space-between;
      .prize-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .prize-texture {
          width: 50px;
          height: 50px;
          background: blue;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        p {
          font-size: 0.9rem;
        }
      }
    }
  }
  .tries-left {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 3rem;
      font-family: var(--didot);
      margin-right: 10px;
    }
  }
  .terms {
    font-size: 0.8rem;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`

export default function Prize({ startNewGame, data }) {
  const { score, prize, currency, tries, url, id } = useGameStateContext()
  const [cookies, setCookie] = useCookies(["playAttempts"])

  React.useEffect(() => {
    gsap.from(".prize-container", {
      scale: 0.8,
      autoAlpha: 0,
      delay: 0.25,
      stagger: 0.15,
    })
  }, [])

  React.useEffect(() => {
    axios
      .post(`${url}/api/v1/end`, {
        id,
        point: score,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Popup>
        <PrizeStyles>
          <h1>
            {prize === "LOST"
              ? data?.result[0]?.widgets?.lost_text
              : prize === "BRONZE"
              ? data?.result[0]?.widgets?.bronze_text
              : prize === "SILVER"
              ? data?.result[0]?.widgets?.silver_text
              : data?.result[0]?.widgets?.gold_text}
          </h1>
          <p>
            {data?.result[0]?.widgets?.found_match.replace("{score}", score)}
          </p>
          <div className="prize-prizes">
            <div className="prize-texture-container">
              <div
                className="prize-container"
                style={{
                  opacity:
                    prize === "BRONZE" || prize === "SILVER" || prize === "GOLD"
                      ? 1
                      : 0.1,
                }}
              >
                <div className="prize-texture bronze">
                  <img src={bronzeTexture} alt="" />
                </div>
                <p>{data?.result[0]?.widgets?.bronze_individual_text}</p>
              </div>
              <div
                className="prize-container"
                style={{
                  opacity: prize === "SILVER" || prize === "GOLD" ? 1 : 0.1,
                }}
              >
                <div className="prize-texture silver">
                  <img src={silverTexture} alt="" />
                </div>
                <p>{data?.result[0]?.widgets?.silver_individual_text}</p>
              </div>
              <div
                className="prize-container"
                style={{ opacity: prize === "GOLD" ? 1 : 0.1 }}
              >
                <div className="prize-texture gold">
                  <img src={goldTexture} alt="" />
                </div>
                <p>{data?.result[0]?.widgets?.gold_individual_text}</p>
              </div>
            </div>
            <p>
              {prize === "LOST"
                ? data?.result[0]?.widgets?.lost_on_third_try_text
                : prize === "BRONZE"
                ? data?.result[0]?.widgets?.bronze_text_bottom
                : prize === "SILVER"
                ? data?.result[0]?.widgets?.silver_text_bottom
                : data?.result[0]?.widgets?.gold_text_bottom}
            </p>
          </div>
          {prize !== "LOST" && (
            <button className="button" style={{ width: "100%" }}>
              {data?.result[0]?.widgets?.add_to_cart}
            </button>
          )}
          {parseInt(cookies.playAttempts, 10) > 1 && (
            <button onClick={startNewGame}>
              {data?.result[0]?.widgets?.play_again}
            </button>
          )}
          <p className="tries-left">
            <span>
              {parseInt(cookies.playAttempts, 10) > 1
                ? parseInt(cookies.playAttempts, 10) - 1
                : 0}
            </span>{" "}
            {data?.result[0]?.widgets?.tries_left}
          </p>
          <a className="terms" href={data?.home[0]?.widgets?.link_address}>
            {data?.home[0]?.widgets?.terms_text
              .replace("{tries}", tries)
              .replace("{currency}", currency)}
          </a>
        </PrizeStyles>
      </Popup>
    </>
  )
}
