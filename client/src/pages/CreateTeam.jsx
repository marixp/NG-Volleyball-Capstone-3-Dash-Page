import React, { useState } from "react";
import axios from "axios";

const CreateTeam = ({ onClose }) => {
    const [teamName, setTeamName] = useState("");
    const [captainUsername, setCaptainUsername] = useState("");
    const [users, setUsers] = useState([{ name: "", email: "" }]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState('');


    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5555/teams", {
                teamName,
                captainUsername,
                users: users.map(({ name, email }) => ({ name, email })),
            });
            console.log("Team created successfully", response.data);
            alert(`Team ${teamName} Created Successfully!`);
            setShowSuccessMessage(true);
            setTeamName("");
            setCaptainUsername("");
            setUsers([{ name: "", email: "" }]);
        } catch (error) {
            console.error("Error Creating Team", error);
        }
    };

    const handleUserChange = (index, key, value) => {
        const updatedUsers = [...users];
        updatedUsers[index][key] = value;
        setUsers(updatedUsers);
    };

    const addUser = () => {
        if (users.length < 6) {
            setUsers([...users, { name: "", email: "" }]);
        } else {
            setError("Maxium number of users reached")
        }
    };

    const removeUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    const closePopup = () => {
        setShowSuccessMessage(false);
        onClose(); // Close the popup
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <button onClick={closePopup} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-4xl font-bold mb-4 text-center">Team Registration Form</h1>
                <form onSubmit={formSubmit} className="text-center">
                    {/* Team name input */}
                    <div className="mb-4">
                        <label htmlFor="teamName" className="block font-bold text-left mb-2">Team Name:</label>
                        <input
                            id="teamName"
                            placeholder="Example: Team Avengers"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="bg-gray-200 px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    {/* Captain username input */}
                    <div className="mb-4">
                        <label htmlFor="captainUsername" className="block font-bold text-left mb-2">Captain Username:</label>
                        <input
                            id="captainUsername"
                            placeholder="Example: player@gmail.com"
                            type="text"
                            value={captainUsername}
                            onChange={(e) => setCaptainUsername(e.target.value)}
                            className="bg-gray-200 px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    {/* User inputs */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4 text-left">Add Players (6 Maximum)</h2>
                        {users.map((user, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={user.name}
                                    onChange={(e) => handleUserChange(index, "name", e.target.value)}
                                    className="bg-gray-200 px-5 py-2 rounded"
                                    style={{ width: "180px", marginRight: "8px" }}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={(e) => handleUserChange(index, "email", e.target.value)}
                                    className="bg-gray-200 px-4  py-2 rounded mr-2"
                                    style={{ width: "200px", marginRight: "8px" }}
                                    required
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => removeUser(index)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">-</button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addUser}
                            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                            style={{ alignSelf: 'flex-start', marginLeft: '1px', marginTop: '8px' }}
                        >+</button>
                    </div>
                    {/* Submit button */}
                    <div className="mb-4" style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            type="submit"
                            className="bg-white text-black px-7 py-3 rounded-full hover:bg-orange-600 transition-colors"
                            style={{ color: "white", background: "linear-gradient(135deg, #FFA500, #FF4500)", fontWeight: "bold", width: "200px" }}
                        >
                            Create Team
                        </button>
                    </div>
                </form>
                {/* Success message */}
                {showSuccessMessage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">Team Created Successfully!</h2>
                            <button onClick={closePopup} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTeam;