import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeamsForLadder = () => {
    const { ladderID } = useParams();

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (!ladderID) {
            return;
        }
        axios
            .get(`http://localhost:5555/ladders/${ladderID}/teams`)
            .then((response) => {
                const sortedTeams = response.data.data.sort((a, b) => a.ladderPosition - b.ladderPosition);
                setTeams(sortedTeams);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ladderID]);

    if (!teams) return '';

    const handleChallenge = (teamId) => {
        // Logic for handling team challenge
        console.log('Challenging team with ID:', teamId);
    };

    return (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Teams for Ladder</h2>
            <ul style={{ listStyle: 'none', padding: '0', width: '50%' }}>
                {teams.map((team) => (
                    <li key={team._id} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', padding: '20px', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
                            <span style={{ fontWeight: 'bold', marginRight: '20px', flex: '2' }}>{team.teamName}</span>
                            <span style={{ fontWeight: 'bold', marginRight: '20px', flex: '2' }}>Position: {team.ladderPosition}</span>
                            <span style={{ flex: '1', marginRight: '20px' }}>{team.captainName}</span>
                            <span style={{ flex: '1', marginRight: '20px' }}>{team.captainEmail}</span>
                            <button onClick={() => handleChallenge(team._id)} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Challenge</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamsForLadder;