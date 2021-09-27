import React from "react"
import styled from "styled-components"
import cardBack from "../assets/images/cards-back.jpg"

const CardStyles = styled.div`
  width: 60px;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5));
  pointer-events: all;
  transform-style: preserve-3d;
  perspective: 1000px;
  backface-visibility: visible;
  z-index: 1;
  .card-back {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: 0.4s;
    backface-visibility: hidden;
    pointer-events: none;
    transform-style: preserve-3d;
    &.flipped {
      transform: rotateY(180deg) perspective(100px);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .card-front {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: rotateY(180deg) perspective(100px);
    transition: 0.4s;
    backface-visibility: hidden;
    pointer-events: none;
    &.flipped {
      transform: rotateY(0deg) perspective(100px);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export default function Card({ flipped, matched, data, i, ...rest }) {
  return (
    <>
      <CardStyles
        data-card-id={`${data?.id}`}
        data-card-index={`${i}`}
        className="card"
        {...rest}
      >
        <div
          className={
            matched.includes(`${data?.id}`) || flipped.includes(`${i}`)
              ? "card-back flipped"
              : "card-back"
          }
        >
          <img src={cardBack} alt="" />
        </div>
        <div
          className={
            matched.includes(`${data?.id}`) || flipped.includes(`${i}`)
              ? "card-front flipped"
              : "card-front"
          }
        >
          <img src={data?.image} alt="" />
        </div>
      </CardStyles>
    </>
  )
}
