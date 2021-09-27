import React from "react"
import { useGameStateContext } from "../actions/gameReducer"
import Popup from "./Popup"

export default function ClosedPopup() {
  const { open } = useGameStateContext()

  return (
    <>
      {parseInt(open, 10) === 2 && (
        <>
          <Popup>
            <h2>GAME CLOSED</h2>
            <p>
              Thank you for stopping by.
              <br />
              The game is now closed.
            </p>
            <a className="button" href="https://www.artisanparfumeur.com">
              Continue Shopping
            </a>
          </Popup>
        </>
      )}
    </>
  )
}
