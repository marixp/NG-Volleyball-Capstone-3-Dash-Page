import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JoinLadder from './JoinLadder';

const Ladders = () => {
    const [ladders, setLadders] = useState([]);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [selectedLadderID, setSelectedLadderID] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5555/ladders')
            .then((response) => {
                setLadders(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleJoinLadder = (ladderID, teamName) => {
        // Send request to join ladder with teamName
        console.log('Joining ladder with ID:', ladderID, 'and team name:', teamName);
        // Close the modal
        setShowJoinModal(false);
    };

    const handleJoinModalOpen = (ladderID) => {
        setSelectedLadderID(ladderID);
        setShowJoinModal(true);
    };

    const handleJoinModalClose = () => {
        setShowJoinModal(false);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl my-8 text-emerald-500 font-bold tracking-wide uppercase text-center">Ongoing Ladder Tournaments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ladders.map((ladder) => (
                    <div key={ladder._id} className="border border-gray-500 rounded-lg bg-gray-800 p-4 flex flex-col justify-between">
                        <div>
                            <Link to={'/ladders/details/' + ladder.ladderID} className="block text-white font-semibold hover:text-emerald-500">
                                <h2 className="text-2xl mb-2">{ladder.ladderName}</h2>
                                <p className="text-sm text-gray-400">Type: {ladder.gameTeamSize}</p>
                                <p className="text-sm text-gray-400">Start Date: {new Date(ladder.startDate).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-400">End Date: {new Date(ladder.endDate).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-400">Teams: {ladder.teams.length} / {ladder.teamSize}</p>
                            </Link>
                        </div>
                        <button onClick={() => handleJoinModalOpen(ladder.ladderID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                            Join
                        </button>
                    </div>
                ))}
            </div>
            {showJoinModal && (
                <JoinLadder ladderID={selectedLadderID} onClose={handleJoinModalClose} onJoin={handleJoinLadder} />
            )}
        </div>
    );
};

export default Ladders;