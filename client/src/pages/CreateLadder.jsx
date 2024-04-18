import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateLadderForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        ladderManager: '',
        ladderID: '',
        ladderName: '',
        gameTeamSize: '2v2',
        teamSize: '',
        startDate: '',
        endDate: '',
        surfaceType: '',
        numRungs: '',
        numRungWidth: '',
        teams: [{ name: '', captainUsername: '' },{ name: '', captainUsername: '' }]
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTeamMemberChange = (index, key, value) => {
        const updatedTeams = [...formData.teams];
        updatedTeams[index][key] = value;
        setFormData({ ...formData, teams: updatedTeams });
    };

    const addTeamMember = () => {
        if (formData.teams.length < formData.teamSize) {
            setFormData({ ...formData, teams: [...formData.teams, { name: '', captainUsername: '' }] });
        } else {
            setError('Maximum number of teams reached');
        }
    };

    const removeTeamMember = (index) => {
        if (formData.teams.length > 2) {
            const updatedTeams = [...formData.teams];
            updatedTeams.splice(index, 1);
            setFormData({ ...formData, teams: updatedTeams });
        } else {
            setError('At least two team member is required');
        }
    };

    const resetForm = () => {
        setFormData({
            ladderManager: '',
            ladderID: '',
            ladderName: '',
            gameTeamSize: '',
            teamSize: '',
            startDate: '',
            endDate: '',
            surfaceType: '',
            numRungs: '',
            numRungWidth: '',
            teams: [{ name: '', captainUsername: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post('http://localhost:5555/ladders', formData);
            console.log('Ladder created successfully:', response.data);
            setMessage('Ladder created successfully!');
            resetForm(); // Reset form after successful submission
        } catch (error) {
            console.error('Error creating ladder:', error);
            setError('Failed to create ladder');
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-2xl font-semibold mb-4 text-center" style={{ fontSize: '35px' , fontWeight: 'bold'}}>Create Ladder Tournament</h1>
                {/* <Link to="/dashboard" className="ml-auto text-blue-500 hover:underline">Back</Link> */}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ladder ID:</label>
                        <input type="number" name="ladderID" value={formData.ladderID} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ladder Manager Email:</label>
                        <input type="text" name="ladderManager" value={formData.ladderManager} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ladder Name:</label>
                        <input type="text" name="ladderName" value={formData.ladderName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tournament Style:</label>
                        <select name="gameTeamSize" value={formData.gameTeamSize} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="2v2">2v2</option>
                            <option value="3v3">3v3</option>
                            <option value="4v4">4v4</option>
                            <option value="5v5">5v5</option>
                            <option value="6v6">6v6</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Teams for a Ladder:</label>
                        <input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Surface Type:</label>
                        <select name="surfaceType" value={formData.surfaceType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value='Beach/Sand'>Beach/Sand</option>
                            <option value='Indoor'>Indoor</option>
                            <option value='Grass'>Grass</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Rungs: (Rows)</label>
                        <input type="number" name="numRungs" value={formData.numRungs} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Rung Width:(Columns)</label>
                        <input type="number" name="numRungWidth" value={formData.numRungWidth} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 col-span-2">
                        <h3 className="text-gray-700 text-sm font-bold mb-2">Add Teams (Two Minimum)</h3>
                        {formData.teams.map((member, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                    placeholder="Team Name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input
                                    type="text"
                                    value={member.captainUsername}
                                    onChange={(e) => handleTeamMemberChange(index, 'captainUsername', e.target.value)}
                                    placeholder="Team Captain Email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <button type="button" onClick={() => removeTeamMember(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={addTeamMember} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">+</button>
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="bg-white text-black px-7 py-3 rounded-full hover:bg-orange-600 transition-colors"
                            style={{ color: "white", background: "linear-gradient(135deg, #FFA500, #FF4500)", fontWeight: "bold", width: "200px" }}>Create Ladder</button>
                    </div>
                </form>
                {message && <div className="text-green-500 mt-4">{message}</div>}
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
};

export default CreateLadderForm;
