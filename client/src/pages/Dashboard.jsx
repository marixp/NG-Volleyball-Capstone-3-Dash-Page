import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../UserContext"; // Import UserContext
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaTrophy, FaTasks, FaHistory, FaUserCog, FaCogs, FaBars } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoIosCreate,IoIosNotifications } from "react-icons/io";
import { TbTournament } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import CreateLadderForm from './CreateLadder.jsx';
import CreateTeamForm from "./CreateTeam.jsx";
import "../css/db-style.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); // Access user context
    const [showCreateLadderPopup, setShowCreateLadderPopup] = useState(false);
    const [showCreateTeamPopup,setShowCreateTeamPopup] = useState(false);
    const toggleCreateLadderPopup = () => {
        setShowCreateLadderPopup(!showCreateLadderPopup);
    };
    const toggleCreateTeamPopup = () => {
        setShowCreateTeamPopup(!showCreateTeamPopup);
    };
    const handleClosePopup = () => {
        setShowCreateLadderPopup(false);
        setShowCreateTeamPopup(false);
    };
    async function logout() {
        await axios.post('http://localhost:5555/users/logout');
        navigate('/');
        setUser(null);
    }

    
    
    return (
        <div className="db-screen">
            
            <aside className="dnav-cont">

                <div className="dnav-box">
                    <h2> Hello, {user ? user.fullname : ''} ! </h2>
                    <h2> Quick Menu </h2>
                    <li htmlFor="togbut" className="toggle">
                        <FaBars className="mr-2"/>
                    </li>
                    <ul>
                        <li>
                            <Link to="/" className="flex items-center py-2 px-4">
                                <FaHome className="mr-2" />
                                Home Page
                            </Link>
                        </li>
                        <li>
                            <button onClick={toggleCreateTeamPopup} className="flex items-center py-2 px-4">
                                <IoIosCreate className="mr-2" />
                                Create Team
                            </button>
                        </li>
                        <li>
                            <button onClick={toggleCreateLadderPopup} className="flex items-center py-2 px-4">
                                <FaRankingStar className="mr-2" />
                                Create Ladder
                            </button>
                        </li>
                        <li>
                            <Link to="/ladders" className="flex items-center py-2 px-4">
                                <TbTournament className="mr-2" />
                                View Ladders
                            </Link>
                        </li>
                        <li>
                            <Link to="/teams" className="flex items-center py-2 px-4">
                                <FaUsers className="mr-2" />
                                Find Teams
                            </Link>
                        </li>
                        <li>
                            <Link to="/Setting" className="flex items-center py-2 px-4">
                                <FaCogs className="mr-2" />
                                Settings
                            </Link>
                        </li>
                        <button onClick={logout} className="logout-butt">
                            Log Out
                        </button>
                    </ul>
                    
                </div>
            </aside>
            <main className="db-maincont">
                <div className="db-mainblock">
                    <section id="5" className="shadow-md">
                        <h2> <FaUserCog className="mr-2" /> Welcome {user ? user.fullname : ''} </h2>
                        <div className="db-mainuserinfo">Player Position: {user ? user.playerPosition : ''} </div>
                        <div className="db-mainuserinfo">Bio: {user ? user.bio : ''}</div>
                    </section>
                    <section id="1" className="shadow-md">
                        <h2> <FaUsers className="mr-2" />Team Overview</h2>
                        <div >
                            <div className="db-mainuserinfo">Team Name:</div>
                            <div className="db-mainuserinfo">Team Captain:</div>
                            <div className="db-mainuserinfo">Teammate Profiles</div>
                        </div>
                    </section>
                </div>
                <div className="db-mainblock">
                    <section id="4" className="shadow-md">
                        <h2> <IoIosNotifications className="mr-2" /> Notifications:</h2>
                        <p> This section will display Notifications. </p>
                    </section> 
                    <section id="4" className="shadow-md">
                        <h2> <FaHistory className="mr-2" /> Match History</h2>
                        <p> This section will display Match History. </p>
                    </section>
                    <section id="3" className="shadow-md">
                        <h2> <FaTasks className="mr-2" /> Challenge Management</h2>
                        <p> This section will display a summary of users team details. </p>
                    </section>
                </div>
                <div className="lad-spanblock" >
                    <section id="2" className="shadow-md">
                        <h2> <FaTrophy className="mr-2" />Ladder Structure</h2>
                        <button onClick={toggleCreateLadderPopup} className="blu-button">
                            Create Ladder
                        </button>
                    </section>
                </div>
            </main>
            {showCreateLadderPopup && <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <button onClick={handleClosePopup} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <CreateLadderForm onClose={handleClosePopup} />
                </div>
            </div>}
            {showCreateTeamPopup && <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <button onClick={handleClosePopup} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <CreateTeamForm onClose={handleClosePopup} />
                </div>
            </div>}
        </div>
    );
};

export default Dashboard;