import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [accountType, setAccountType] = useState('Regular');
    const navigate = useNavigate();

    async function register(event) {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5555/users/signup', {
                userName,
                fullname,
                password,
                gender,
                dateOfBirth,
                phoneNumber,
                playerPosition,
                experienceLevel,
                bio,
                profilePicture,
                accountType,
            });
            alert("Signed up successfully. Go login");
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('Failed. Please try again');
        }
    }

    return (
        <div className="container mx-auto mt-8 px-6 py-8 max-w-lg bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>
            <form onSubmit={register} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full name</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(event) => setFullname(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={userName}
                            onChange={(event) => setUsername(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(event) => setDateOfBirth(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Player Position</label>
                        <input
                            type="text"
                            value={playerPosition}
                            onChange={(event) => setPlayerPosition(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Experience Level</label>
                        <select
                            value={experienceLevel}
                            onChange={(event) => setExperienceLevel(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select Experience Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Account Type</label>
                    <select
                        value={accountType}
                        onChange={(event) => setAccountType(event.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="Regular">Regular</option>
                        <option value="Team Captain">Team Captain</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                        <input
                            type="text"
                            value={profilePicture}
                            onChange={(event) => setProfilePicture(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-center">
                Already have an account? {" "}
                <Link className="text-blue-500 hover:underline" to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
