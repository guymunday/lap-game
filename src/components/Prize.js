import React from "react"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import { gsap } from "gsap"
import Popup from "./Popup"
import { useGameStateContext } from "../actions/gameReducer"
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
  }
`

export default function Prize({ startNewGame }) {
  const { score, prize, currency } = useGameStateContext()
  const [cookies, setCookie] = useCookies(["playAttempts"])

  React.useEffect(() => {
    gsap.from(".prize-container", {
      scale: 0.8,
      opacity: 0,
      delay: 0.25,
      stagger: 0.15,
    })
  }, [])

  return (
    <>
      <Popup>
        <PrizeStyles>
          <h1>Congratulations</h1>
          <p>You found {score} matches</p>
          <div className="prize-prizes">
            <div className="prize-texture-container">
              <div className="prize-container">
                <div
                  className="prize-texture bronze"
                  style={{
                    opacity:
                      prize === "BRONZE" ||
                      prize === "SILVER" ||
                      prize === "GOLD"
                        ? 1
                        : 0.1,
                  }}
                >
                  <img src={bronzeTexture} alt="" />
                </div>
                <p
                  style={{
                    opacity:
                      prize === "BRONZE" ||
                      prize === "SILVER" ||
                      prize === "GOLD"
                        ? 1
                        : 0.1,
                  }}
                >
                  BRONZE
                </p>
              </div>
              <div className="prize-container">
                <div
                  className="prize-texture silver"
                  style={{
                    opacity: prize === "SILVER" || prize === "GOLD" ? 1 : 0.1,
                  }}
                >
                  <img src={silverTexture} alt="" />
                </div>
                <p
                  style={{
                    opacity: prize === "SILVER" || prize === "GOLD" ? 1 : 0.1,
                  }}
                >
                  SILVER
                </p>
              </div>
              <div className="prize-container">
                <div
                  className="prize-texture gold"
                  style={{ opacity: prize === "GOLD" ? 1 : 0.1 }}
                >
                  <img src={goldTexture} alt="" />
                </div>
                <p style={{ opacity: prize === "GOLD" ? 1 : 0.1 }}>GOLD</p>
              </div>
            </div>
            <p>
              You unlocked the {prize} level prize. Lorem ipsum. You unlocked
              the bronze level {prize}. Lorem ipsum.
            </p>
          </div>
          <button className="button" style={{ width: "100%" }}>
            Choose your prize
          </button>
          {parseInt(cookies.playAttempts, 10) > 1 && (
            <button onClick={startNewGame}>Try again</button>
          )}
          <p className="tries-left">
            <span>
              {parseInt(cookies.playAttempts, 10) > 1
                ? parseInt(cookies.playAttempts, 10) - 1
                : 0}
            </span>{" "}
            games remaining today
          </p>
          <p className="terms">
            Your prize will be added to your basket with an order of {currency}
            140 or more. Limited to 3 plays per day.{" "}
            <a href="#">Peruse the full terms and conditions.</a>
          </p>
        </PrizeStyles>
      </Popup>
    </>
  )
}
