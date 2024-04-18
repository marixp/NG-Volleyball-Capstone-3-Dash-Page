import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { UserContext } from "../UserContext";

//const [message, setMessage] = useState("");

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/teams')
            .then((response) => {
                setTeams(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    },[]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTeams = teams.filter((team) =>
        team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const {user, setUser} = useContext(UserContext);
  return (
    <div >
        <div className = 'flex justify-between items-center'>
        <h1 className="text-3xl font-bold my-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">All Teams</span>
        </h1>
            
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                <div className="pb-4 bg-white dark:bg-gray-900">
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative mt-1 ">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          id="table-search" 
          className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Search for teams" 
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </div>

                <table className='w-full table-auto border-seperate border-spacing-2 '>
                    <thead className ='bg-orange-100 text-gray-600'>
                        <tr className='h-8'>
                            
                            <th >Team Name</th>
                            
                            <th >Ladder Position</th>
                            <th >Team Captain</th>
                            {user && <th >Action</th>}
                        </tr>
                    </thead>
                    <tbody className =' border-seperate border-spacing-2 mt-10 rounded-md  '>
                        {filteredTeams.map((team,index) => (
                            <tr key={team._id} className ='border-b border-slate-300 py-5 h-12 text-slate-600'>
                               
                               
                                <td className =' text-center'>
                                    {team.teamName}
                                </td>

                                
                                <td className =' text-center'>
                                    {team.ladderPosition}
                                </td>
                                <td className =' text-center'>
                                    {team.captainUsername}
                                </td>
                                { user && <td >
                                    <div className="flex justify-center"> {/* Added this div to center the button */}
                                    <button className='border border-orange-300 rounded-xl bg-orange-400 flex justify-center px-3 text-slate-100'>
                                        Join
                                    </button>
                                    </div>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

            )}
            </div>
  )
}

export default Teams