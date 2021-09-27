import React from "react"
import styled from "styled-components"
import drawsTexture from "../assets/images/draws-texture-small.jpg"

const StyledFooter = styled.footer`
  font-size: 12px !important;
  background: #fff;
  .footer-inner {
    /* margin-top: 72px; */
    padding: 36px;
    border-top: 1px solid #000;
    padding-bottom: 17px;
    nav {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;

        li {
          margin-right: 30px;
          a {
            font-family: "akkuratregular";
            font-weight: normal;
            text-transform: uppercase;
            letter-spacing: 1.25pt;
            text-decoration: none;
            color: #000;
          }
          img {
            width: 100%;
          }
        }
      }
    }
    @media (max-width: 885px) {
      nav {
        ul {
          align-items: center;
          justify-content: space-evenly;
          li {
            margin: 0 15px 8px 15px !important;
            a {
              text-align: center;
            }
          }
        }
      }
    }
    @media (max-width: 520px) {
      nav {
        ul {
          flex-direction: column;
        }
      }
    }
  }
  .footer-copyright {
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 36px;
    margin-top: -36px;
    font-family: "akkurat_lightregular";
    img {
      width: 137px;
    }
    @media (max-width: 885px) {
      text-align: center;
      padding-top: 17px;
      border-top: 1px solid #000;
      margin-top: 12px;
      .copyright {
        width: 100%;
        text-align: center;
      }
      img {
        display: none;
      }
    }
  }
`

const StyledImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 150px;
  }
`

export default function Footer() {
  return (
    <>
      <StyledFooter>
        <StyledImg src={drawsTexture} alt="" />
        <div className="footer-inner">
          <nav>
            <ul className="menu">
              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/contact-us.html"
                >
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/delivery-information.html"
                >
                  <span>Delivery Information</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/careers.html"
                >
                  <span>Careers</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/sitemap.html"
                >
                  <span>Sitemap</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/frequent-questions.html"
                >
                  <span>Frequent Questions</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/privacy-policy.html"
                >
                  <span>Privacy Policy</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/cookie-policy.html"
                >
                  <span>Cookie Policy</span>
                </a>
              </li>

              <li>
                <a
                  className="lvl1 "
                  href="https://www.artisanparfumeur.com/terms.html"
                >
                  <span>Terms &amp; Conditions</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-copyright">
          <img
            src="https://www.artisanparfumeur.com/images/common/com-ssl-certficate.png?1"
            alt="SSL certificate"
          />
          <div className="copyright">© 2021 L'Artisan Parfumeur</div>
        </div>
      </StyledFooter>
    </>
  )
}
