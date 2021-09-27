import React from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import { gsap } from "gsap"
import Card from "../components/Card"
import Shelf from "../components/Shelf"
import Timer from "../components/Timer"
import { shuffledCards } from "../actions/shuffleCards"
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../actions/gameReducer"
import Prize from "../components/Prize"
import { imagePromise } from "../actions/imagePromise"
import TermsAndAudio from "../components/TermsAndAudio"

const LoadingStyles = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CardsGrid = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: calc((60px * 4) + (14px * 4));
  margin: 20px auto 50px;
  transition: 0.2s ease opacity;
  @media (min-width: 767px) {
    width: 600px;
    align-items: center;
    justify-content: space-evenly;
  }
  .card {
    margin: 15px 7px;
    @media (min-width: 767px) {
      margin: 15px 20px;
    }
  }
  .fake-card {
    width: 4px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .shelf {
    position: absolute;
    left: -9.2%;
    @media (max-width: 330px) {
      display: none;
    }
    &.shelf-1 {
      top: 16%;
      @media (min-width: 767px) {
        top: 21.5%;
        width: 725px !important;
      }
    }
    &.shelf-2 {
      top: 41%;
      @media (min-width: 767px) {
        top: 54.8%;
        width: 725px !important;
      }
    }
    &.shelf-3 {
      top: 66%;
      @media (min-width: 767px) {
        top: 88%;
        width: 725px !important;
      }
    }
    &.shelf-4 {
      top: 91%;
      @media (min-width: 767px) {
        display: none;
      }
    }
  }
`

const DesktopTimerStyles = styled.div`
  width: 450px;
  padding-bottom: 30px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`

const MobileTimerStyles = styled.div`
  @media (min-width: 767px) {
    display: none;
  }
`

export default function Play() {
  const seconds = 1 // 61 to allow for animation to finish

  const [loading, setLoading] = React.useState(true)
  const [timer, setTimer] = React.useState(seconds)
  const [newGame, setNewGame] = React.useState(false)
  const [flipped, setFlipped] = React.useState([])
  const [matched, setMatched] = React.useState([])
  const [gameScore, setGameScore] = React.useState(0)

  const dispatch = useGameDispatchContext()
  const { firstPrize, prize } = useGameStateContext()
  const [cookies, setCookie] = useCookies(["playAttempts"])

  const attempts = 7

  const bronze = 0
  const silver = 3
  const gold = 5

  const bronzeInStock = true
  const silverInStock = true
  const goldInStock = true

  const shuffleCards = () => {
    const cardSelector = document.querySelectorAll(".card")
    for (let x = 0; x < cardSelector.length; x++) {
      let randomPos = Math.floor(Math.random() * 15)
      cardSelector[x].style.order = randomPos
    }
  }

  const animateCards = () => {
    gsap.fromTo(
      ".card",
      {
        x: 1000,
        y: 1000,
        rotate: -60,
        skewY: -60,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotate: 0,
        skewY: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
      }
    )
  }

  const startNewGame = () => {
    dispatch({
      type: "UPDATE_FIRST_PRIZE",
      first: "",
    })
    dispatch({
      type: "UPDATE_SECOND_PRIZE",
      second: "",
    })
    dispatch({
      type: "UPDATE_PRIZE",
      prize: "",
    })

    shuffleCards()
    setTimer(seconds)
    setMatched([])
    setFlipped([])
    setGameScore(0)
    saveToCookies()
    animateCards()
  }

  const saveToCookies = () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0)
    tomorrow.setMinutes(0)
    tomorrow.setMilliseconds(0)

    if (!cookies.playAttempts) {
      setCookie("playAttempts", attempts, { path: "/", expires: tomorrow })
    } else {
      let attempts = parseInt(cookies.playAttempts, 10) - 1
      setCookie("playAttempts", attempts.toString(), {
        path: "/",
        expires: tomorrow,
      })
    }
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      timer > 0 && setTimer(timer - 0.01)
    }, 10)
    return () => clearTimeout(timeout)
  }, [timer])

  React.useEffect(() => {
    if (timer < 15) {
      document.documentElement.style.setProperty("--progress", "#B34643")
    } else {
      document.documentElement.style.setProperty("--progress", "#D3BB89")
    }
  }, [timer])

  function handleCardClick(e) {
    if (parseInt(cookies.playAttempts, 10) === 0) {
      return
    } else if (flipped.includes(e.target.dataset.cardIndex)) {
      return
    } else if (!firstPrize) {
      dispatch({
        type: "UPDATE_FIRST_PRIZE",
        first: e.target.dataset.cardId,
      })
      setFlipped([e.target.dataset.cardIndex])
    } else if (firstPrize !== e.target.dataset.cardId) {
      dispatch({ type: "UPDATE_FIRST_PRIZE", first: "" })
      setFlipped([...flipped, e.target.dataset.cardIndex])
      setTimeout(() => setFlipped([]), 500)
    } else if (firstPrize === e.target.dataset.cardId) {
      dispatch({
        type: "UPDATE_SECOND_PRIZE",
        first: e.target.dataset.cardId,
      })
      dispatch({
        type: "UPDATE_FIRST_PRIZE",
        first: "",
      })
      setGameScore(gameScore + 1)
      setFlipped([...flipped, e.target.dataset.cardIndex])
      setMatched([...matched, e.target.dataset.cardId])
    }
  }

  React.useEffect(() => {
    if (matched.length === 8) {
      setTimer(0)
    }
  }, [matched])

  React.useEffect(() => {
    if (matched.length === 8 || timer <= 0) {
      dispatch({ type: "UPDATE_SCORE", score: gameScore })
      if (gameScore < bronze) {
        dispatch({ type: "UPDATE_PRIZE", prize: "none" })
      } else if (gameScore >= bronze && gameScore < silver && bronzeInStock) {
        dispatch({ type: "UPDATE_PRIZE", prize: "BRONZE" })
      } else if (
        (gameScore >= silver && gameScore < gold && silverInStock) ||
        (gameScore >= bronze && gameScore < silver && !bronzeInStock) ||
        (gameScore >= gold && !goldInStock)
      ) {
        dispatch({ type: "UPDATE_PRIZE", prize: "SILVER" })
      } else if (
        (gameScore >= gold && goldInStock) ||
        (gameScore >= silver && gameScore < gold && !silverInStock)
      ) {
        dispatch({ type: "UPDATE_PRIZE", prize: "GOLD" })
      }
    }
  }, [matched, timer])

  React.useEffect(() => {
    imagePromise(setLoading)
  }, [])

  React.useEffect(() => {
    !loading && startNewGame()
  }, [loading])

  if (parseInt(cookies.playAttempts, 10) <= 0) {
    return <Redirect to="/" />
  }

  return (
    <>
      {!loading && (
        <MobileTimerStyles>
          <Timer value={timer} />
        </MobileTimerStyles>
      )}
      <div className="content-flex">
        <CardsGrid style={{ opacity: loading ? 0 : 1 }}>
          <Shelf width="350px" className="shelf shelf-1" />
          <Shelf width="350px" className="shelf shelf-2" />
          <Shelf width="350px" className="shelf shelf-3" />
          <Shelf width="350px" className="shelf shelf-4" />
          <div className="fake-card" />
          {shuffledCards?.map((s, i) => {
            return (
              <Card
                key={i}
                data={s}
                i={i}
                flipped={flipped}
                matched={matched}
                onClick={(e) => handleCardClick(e)}
              />
            )
          })}
        </CardsGrid>
        {!loading && (
          <DesktopTimerStyles>
            <Timer value={timer} />
          </DesktopTimerStyles>
        )}
        <TermsAndAudio />
        {loading && <LoadingStyles>Loading...</LoadingStyles>}
      </div>
      {/* {loading && <LoadingScreen />} */}
      {prize && !loading && <Prize startNewGame={startNewGame} />}
    </>
  )
}
