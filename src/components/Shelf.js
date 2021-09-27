import React from "react"
import styled from "styled-components"
import shelfTexture from "../assets/images/shelf-wood-texture.jpg"

const ShelfStyles = styled.div`
  position: relative;
  border-bottom: 4px solid #7f5f1f;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 0;
  width: ${(props) => (props.width ? props.width : "100%")};
  margin: 30px 0;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 1));
  :after {
    content: "";
    display: block;
    position: absolute;
    left: -25px;
    top: 4px;
    right: -25px;
    height: 4px;
    background-color: #7f5f1f;
    background-image: url(${shelfTexture});
  }
`

export default function Shelf({ width, ...rest }) {
  return (
    <>
      <ShelfStyles width={width} {...rest} />
    </>
  )
}
