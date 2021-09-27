import card1 from "../assets/images/cards/card1.jpg"
import card2 from "../assets/images/cards/card2.jpg"
import card3 from "../assets/images/cards/card3.jpg"
import card4 from "../assets/images/cards/card4.jpg"
import card5 from "../assets/images/cards/card5.jpg"
import card6 from "../assets/images/cards/card6.jpg"
import card7 from "../assets/images/cards/card7.jpg"
import card8 from "../assets/images/cards/card8.jpg"

const cards = [
  { id: 1, image: card1 },
  { id: 2, image: card2 },
  { id: 3, image: card3 },
  { id: 4, image: card4 },
  { id: 5, image: card5 },
  { id: 6, image: card6 },
  { id: 7, image: card7 },
  { id: 8, image: card8 },
]

export const shuffledCards = cards
  .concat(cards)
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)
