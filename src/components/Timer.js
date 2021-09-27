import React from "react"
import styled from "styled-components"

const TimerStyles = styled.progress`
  background: #d3bb89;
`

export default function Timer({ value }) {
  return (
    <>
      <progress max="60" min="0" value={value} />
    </>
  )
}
