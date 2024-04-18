import React, { useState } from 'react';

const JoinLadder = ({ ladderID, onClose, onJoin }) => {
    const [teamName, setTeamName] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamName.trim() === '') {
            setError('Team name cannot be empty');
            return;
        }
        setError('');
        onJoin(ladderID, teamName);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Request to Join Ladder</h2>
                <p className="text-sm font-semibold mb-1">Note: Ladder manager will need to approve your request.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
                        <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 mr-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinLadder;
