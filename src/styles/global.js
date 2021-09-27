import { css } from "styled-components"

export const global = css`
  :root {
    font-family: "akkuratregular", sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #000;
    line-height: 1.4;
    --progress: #d3bb89;
    --didot: "Didot", Georgia, "Times New Roman", Times, serif;
    --akkurat: "akkuratregular", sans-serif;
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  main {
    flex: 1 0 auto;
    width: 100%;
    overflow-x: hidden;
  }

  header,
  footer {
    flex-shrink: 0;
  }

  .content-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  h1,
  h2,
  h3 {
    font-family: var(--didot);
    font-weight: 400;
    line-height: 1.2;
  }

  a,
  button {
    color: #000;
    font-size: inherit;
    background: none;
    outline: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    :focus {
      outline: 0;
    }
  }

  .button {
    display: inline-block;
    width: 200px;
    background: black;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    border: 1px solid #000;
    outline: none;
    cursor: pointer;
    transition: 0.2s ease;
    text-transform: uppercase;
    font-size: 16px;
    :hover {
      background: #fff;
      color: #000;
    }
    :focus {
      outline: none;
    }
  }

  .hide-large {
    @media (min-width: 767px) {
      display: none;
    }
  }

  /* Progress / Timer */

  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 100%;
    height: 15px;
    margin: 0;
    padding: 0;
    color: var(--progress);
    display: block;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }

  progress[value]::-webkit-progress-value {
    background: var(--progress);
  }

  progress[value]::-moz-progress-bar {
    background: var(--progress);
  }

  /* End Progress / Timer */
`
