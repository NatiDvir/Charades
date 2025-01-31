import React, {useState} from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF5", "#755A87FF"]; // Add more colors if needed


const Teams = ({onTeamUpdate}) => {
    const [teams, setTeams] = useState([]);
    const [newTeamName, setNewTeamName] = useState("");

    const addTeam = () => {
        if (newTeamName.trim() !== "") {
            const color = colors[teams.length % colors.length];
            setTeams([...teams, { name: newTeamName, score: 0, color }]);
            setNewTeamName("");
            onTeamUpdate(teams);
        }
    };

    const updateScore = (index, delta) => {
        const updatedTeams = teams.map((team, i) => {
            if (i === index) {
                return { ...team, score: team.score + delta };
            }
            return team;
        });
        setTeams(updatedTeams);
        // setRoundScore((prevScore) => prevScore + delta);
    };

    return (
        <div className="teams-section">
            <Card className="team-card">
                <h2 className="section-title">Create a Team</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="input"
                    />
                    <Button onClick={addTeam}>Add Team</Button>
                </div>
            </Card>

            {teams.length > 0 && (
                <Card className="team-list-card">
                    <h2 className="section-title">Teams</h2>
                    <ul className="team-list">
                        {teams.map((team, index) => (
                            <li
                                key={index}
                                className="team-item"
                                style={{borderLeft: `5px solid ${team.color}`}}
                            >
                                <span className="team-name">{team.name}</span>
                                <div className="score-controls">
                                    <Button onClick={() => updateScore(index, -1)}>-</Button>
                                    <span className="team-score">{team.score}</span>
                                    <Button onClick={() => updateScore(index, 1)}>+</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            )}
        </div>
    );
}

export default Teams;
