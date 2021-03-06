import * as React from "react"
import { createContext, useReducer, useContext } from "react"

let initialGameContext = {
  firstPrize: "",
  secondPrize: "",
  prize: "",
  previousPrize: "",
  score: 0,
  audio: false,
  currency: "£",
  open: "on",
  tries: 7,
}

const GameStateContext = createContext(initialGameContext)
const GameDispatchContext = createContext()

const gameReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ID": {
      return {
        ...state,
        id: action.id,
      }
    }
    case "UPDATE_SCORE": {
      return {
        ...state,
        score: action.score,
      }
    }
    case "UPDATE_PRIZE": {
      return {
        ...state,
        prize: action.prize,
      }
    }
    case "UPDATE_BACKUP_PRIZE": {
      return {
        ...state,
        previousPrize: action.prize,
      }
    }
    case "UPDATE_FIRST_PRIZE": {
      return {
        ...state,
        firstPrize: action.first,
      }
    }
    case "UPDATE_SECOND_PRIZE": {
      return {
        ...state,
        secondPrize: action.second,
      }
    }
    case "UPDATE_AUDIO": {
      return {
        ...state,
        audio: action.audio,
      }
    }
    case "UPDATE_CURRENCY": {
      return {
        ...state,
        currency: action.currency,
      }
    }
    case "UPDATE_LANGUAGE": {
      return {
        ...state,
        language: action.language,
      }
    }
    case "UPDATE_GAME_OPEN": {
      return {
        ...state,
        open: action.open,
      }
    }
    case "UPDATE_API_URL": {
      return {
        ...state,
        url: action.url,
      }
    }
    case "UPDATE_TRIES": {
      return {
        ...state,
        tries: action.tries,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameContext)

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  )
}

export const useGameStateContext = () => useContext(GameStateContext)
export const useGameDispatchContext = () => useContext(GameDispatchContext)
