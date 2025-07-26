import React from 'react';

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
      <div className="inner">
        <img className="front" src={card.src} alt="front" />
        <img className="back" src="/img/cover1.png" onClick={handleClick} alt="back" />
      </div>
    </div>
  );
}

export default Card;
