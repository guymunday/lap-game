import React from "react"
import styled from "styled-components"
import concreteTexture from "../assets/images/concrete-texture.jpg"
import drawsTexture from "../assets/images/draws-texture.jpg"
import { imagePromise } from "../utils/imagePromise"
import ClosedPopup from "./ClosedPopup"

const TopDraws = styled.div`
  position: fixed;
  background: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  pointer-events: none;
  transition: 0.8s ease;
  z-index: 98;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const BottomDraws = styled(TopDraws)`
  top: 50%;
`

const LoadingStyles = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 99;
`

const BackgroundImage = styled.div`
  position: fixed;
  z-index: -1;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    min-height: 100%;
  }
`

export default function Layout({ children, data }) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    imagePromise(setLoading)
  }, [])

  return (
    <>
      <BackgroundImage>
        <img src={concreteTexture} alt="" />
      </BackgroundImage>
      {children}
      {loading && <LoadingStyles>Loading...</LoadingStyles>}
      <TopDraws style={{ top: loading ? 0 : "-50%" }}>
        <img src={drawsTexture} alt="" />
      </TopDraws>
      <BottomDraws style={{ top: loading ? "50%" : "100%" }}>
        <img src={drawsTexture} alt="" />
      </BottomDraws>
      <ClosedPopup data={data} />
    </>
  )
}
