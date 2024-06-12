import React from "react";
import "./SingleCard.css";

//props 대신에 {프로퍼티이름}
const SingleCard = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };
  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front"></img>
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card back"
        ></img>
      </div>
    </div>
  );
};

export default SingleCard;
