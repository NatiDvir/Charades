import React, { useState } from "react";
import "./Charade.css";
import Timer from "./Components/Timer/Timer";
import qr from '../assets/qr.svg'
import Game from "./Components/Game/Game";
import Button from "./Components/Button/Button";
import Teams from "./Components/Teams/Teams";


const Modal = ({ isOpen, onClose, onNextTeam, team, roundScore }) => {
  if (!isOpen) return null;
  return (
      <div className="overlay">
        <div className="modal">
          <div className="modal-content">
            <h2>Time is Up!</h2>
            <p>
                {`${team.name}'s turn is over! Well done!`}
            </p>
            <p>
                {`Round Score: ${roundScore}`}
            </p>
            <div className="modal-actions">
              <Button onClick={onNextTeam}>Next Team</Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
  );
};

const CharadesGame = () => {
  const [teams, setTeams] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const skipImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1));
  };

  const updateScore = (index, delta) => {
    const updatedTeams = teams.map((team, i) => {
      if (i === index) {
        return { ...team, score: team.score + delta };
      }
      return team;
    });
    setTeams(updatedTeams);
    setRoundScore((prevScore) => prevScore + delta);
  };

  const startGame = () => {
    if (teams.length === 0) {
      alert("Please add at least one team before starting the game.");
      return;
    }
    setIsGameActive(true);
    setIsTimerActive(true); // Start the timer
  };

  const handleTimerEnd = () => {
    setIsModalOpen(true);
    setIsTimerActive(false); // Start the timer for the next team
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextTeam = () => {
    closeModal();
    const nextIndex = currentTeamIndex + 1;

    if (nextIndex < teams.length) {
      // Move to the next team
      setCurrentTeamIndex(nextIndex);
    } else {
      // All teams have played, advance to the next round
      setCurrentRound((prevRound) => prevRound + 1);
      setCurrentTeamIndex(0);
    }
    setIsTimerActive(true); // Start the timer for the next team
    setRoundScore(0);
    skipImage(); // Skip to the next image
  };

  return (
      <div className="charades-game">
        <div className="top-bar">
          <h1 className="game-title">PayU Charades</h1>
          <img
              className="qr"
              src={qr}
              alt="qr"
              onClick={() => setIsQrModalOpen(true)} // Open the modal
              style={{cursor: "pointer"}} // Indicate clickable behavior
          />
        </div>
        <div className="game">
          <div className="left-panel">
            <div className="timer-section">
              <Teams onTeamUpdate={setTeams} />
              <Timer
                  onTimeUp={handleTimerEnd}
                  isActive={isTimerActive}
              />
            </div>
          </div>
          <Game
                teams={teams}
                currentTeamIndex={currentTeamIndex}
                currentRound={currentRound}
                imageIndex={currentImageIndex}
                isGameActive={isGameActive}
                startGame={startGame}
                nextTeam={nextTeam}
                updateScore={updateScore} />
        </div>


        {/* Modal for Time's Up */}
        <Modal
            isOpen={isModalOpen}
            team={teams[currentTeamIndex]}
            roundScore={roundScore}
            onClose={closeModal}
            onNextTeam={nextTeam}
        />

        {isQrModalOpen && (
            <div className="qr-modal">
              <button className="close-button" onClick={() => setIsQrModalOpen(false)}>
                X
              </button>
              <img src={qr} alt="Enlarged QR Code" className="enlarged-qr" />
            </div>
        )}
      </div>
  );
};

export default CharadesGame;
