import React from "react"

export default function Timer({ value, max }) {
  return (
    <>
      <progress max={max - 1} min="0" value={value} />
    </>
  )
}
