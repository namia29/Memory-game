import React, { useEffect, useState } from 'react';
import Card from './Card';
import './App.css';

const cardImages = [
  { src: '/img/helmet.png', matched: false },
  { src: '/img/potion.png', matched: false },
  { src: '/img/ring.png', matched: false },
  { src: '/img/scroll.png', matched: false },
  { src: '/img/shield.png', matched: false },
  { src: '/img/sword.png', matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffled);
    setTurns(0);
    setTime(0);
    setIsActive(true);
  };

  const handleChoice = card => {
    !firstCard ? setFirstCard(card) : setSecondCard(card);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards(prev =>
          prev.map(card =>
            card.src === firstCard.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>🧠 Memory Match</h1>
      <button onClick={shuffleCards}>🔁 Restart</button>
      <div className="info">
        <p>Turns: {turns}</p>
        <p>Time: {time}s</p>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
