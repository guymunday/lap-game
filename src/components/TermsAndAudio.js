import React from "react"
import styled from "styled-components"
import {
  useGameDispatchContext,
  useGameStateContext,
} from "../actions/gameReducer"

const TermsAndAudioStyles = styled.nav`
  position: absolute;
  left: 20px;
  bottom: 10px;
  text-align: left;
  .terms-inner {
    button {
      width: 40px;
      margin-right: 10px;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 3;
    .terms-inner {
      padding: 10px 20px;
      button {
        width: 40px;
        margin-right: 10px;
        svg {
          fill: #fff;
        }
      }
      a {
        color: #fff !important;
      }
    }
  }
`

export default function TermsAndAudio() {
  const { audio } = useGameStateContext()
  const dispatch = useGameDispatchContext()

  function handleAudioButton() {
    dispatch({ type: "UPDATE_AUDIO", audio: !audio })
  }

  return (
    <>
      <TermsAndAudioStyles>
        <div className="terms-inner">
          <button onClick={handleAudioButton}>
            {audio ? (
              <svg
                viewBox="0 0 16 16"
                height="40"
                width="40"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>VolumeMute icon</title>
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                height="40"
                width="40"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>VolumeUp icon</title>
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path>
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"></path>
                <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"></path>
              </svg>
            )}
          </button>
          <a href="#">Ts & Cs</a>
        </div>
      </TermsAndAudioStyles>
    </>
  )
}
