import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

//퍼블릭 폴더의 이미지들을 사용하기 쉽게 정리
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  //카드 배열을 스테이트로
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); // 턴 횟수
  const [choiceOne, setChoiceOne] = useState(null); //첫번째 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택 카드
  //카드 섞기
  const shuffleCards = () => {
    const 랜덤카드 = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(랜덤카드);
    setTurns(0);
  };
  //console.log(cards, turns);
  //카드 선택시 기억하기 (첫번째 선택 또는 두번째 선택)
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //선택한 카드들을 비교하기
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("카드를 맞췄어요!");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }; //matched를 업데이트
            } else {
              return card; //그대로둠
            }
          });
        });
        resetTurn();
      } else {
        console.log("틀렸네요!");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);
  // 리셋 함수 (선택들을 초기화)
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1); //맞춘 횟수 1증가
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            card={card}
            handleChoice={handleChoice}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
