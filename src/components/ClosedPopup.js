import React from "react"
import { useGameStateContext } from "../utils/gameReducer"
import Popup from "./Popup"

export default function ClosedPopup({ data }) {
  const { open, language } = useGameStateContext()

  return (
    <>
      {open === "off" && (
        <>
          <Popup>
            <h2>{data?.block[0]?.widgets?.title}</h2>
            <p>{data?.block[0]?.widgets?.text}</p>
            <a
              className="button"
              href={`https://www.artisanparfumeur.${
                language === "FR" ? "fr" : "com"
              }`}
            >
              {data?.block[0]?.widgets?.btn_text}
            </a>
          </Popup>
        </>
      )}
    </>
  )
}
