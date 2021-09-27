import React from "react"
import styled from "styled-components"
import drawsTexture from "../assets/images/draws-texture-small.jpg"

const StyledHeader = styled.header`
  width: 100%;
  background: #000;
  .header-inner {
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      max-width: 400px;
      img {
        width: 100%;
      }
    }
  }
  @media (max-width: 480px) {
    padding: 5px 30px;
  }
`

const StyledImg = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 30px;
  }
`

export default function Header() {
  return (
    <>
      <StyledHeader>
        <div className="header-inner">
          <a
            href="https://www.artisanparfumeur.com"
            title="L'Artisan Parfumeur"
          >
            <img
              src="https://www.artisanparfumeur.com/images/common/l-artisan-parfumeur-2016.png"
              alt="L'Artisan Parfumeur"
            />
          </a>
        </div>

        <StyledImg src={drawsTexture} alt="" />
      </StyledHeader>
    </>
  )
}
