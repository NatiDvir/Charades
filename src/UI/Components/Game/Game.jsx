import React, {useEffect, useState} from "react";

const importAll = (r) => r.keys().map(r);

const images = importAll(require.context('../../../../pictures/result', false, /\.(jpg|jpeg|png|gif)$/));

const Card = ({ className, children }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
    return <div className="card-content">{children}</div>;
};

const Button = ({ onClick, children }) => {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
};

const Game = ({ teams, currentRound, currentTeamIndex, updateScore, isGameActive, startGame }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        const imagePaths = images.map((img) => img); // Extract the image path (Webpack adds `.default`)
        setShuffledImages(shuffleArray(imagePaths));
    }, []);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const nextImage = () => {
        updateScore(currentTeamIndex, 1); // Increase the score of the current team
        setCurrentImageIndex((prevIndex) =>
            prevIndex < shuffledImages.length - 1 ? prevIndex + 1 : 0
        );
    };

    const skipImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < shuffledImages.length - 1 ? prevIndex + 1 : 0
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : shuffledImages.length - 1
        );
    };

    return (
            <Card className="game-card">
        <CardContent className="game-card-content">
            <div className="game-header">
                <h3 className="section-title">Round {currentRound}</h3>
                <h3>
                    Current Team:{" "}
                    <strong>{teams[currentTeamIndex]?.name || "No Team"}</strong>
                </h3>
            </div>
            {shuffledImages.length > 0 && isGameActive ? (
                <div className="image-container">
                    <img
                        src={shuffledImages[currentImageIndex]}
                        alt="Charades"
                        className="charades-image"
                    />
                    <div className="image-controls">
                        <Button onClick={previousImage}>Previous</Button>
                        <Button onClick={nextImage}>Next</Button>
                        <Button onClick={skipImage}>Skip</Button>
                    </div>
                </div>
            ) : (
                <Button onClick={startGame}>Start Game</Button>
            )}
        </CardContent>
    </Card>)

}


export default Game
