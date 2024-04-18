import express from 'express'
import {Ladder} from '../models/ladderModel.js'
import { Team } from '../models/teamModel.js';

const router = express.Router();
function generateRandomPositions(numRungs, numTeams) {
    if (numTeams > numRungs) {
        throw new Error('Number of teams cannot be greater than the number of rungs');
    }

    // Create an array of possible ladder positions
    const possiblePositions = Array.from({ length: numRungs }, (_, index) => index + 1);

    // Shuffle the array of possible positions
    for (let i = possiblePositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possiblePositions[i], possiblePositions[j]] = [possiblePositions[j], possiblePositions[i]];
    }

    // Take the first 'numTeams' positions as ladder positions for the teams
    const ladderPositions = possiblePositions.slice(0, numTeams);

    return ladderPositions;
}

router.post('/', async (req, res) => {
    try {
        const { ladderName, ladderID, ladderManager, gameTeamSize, teamSize, startDate, endDate, surfaceType, numRungs, numRungWidth, teams } = req.body;
        
        // Validate required fields
        if (!ladderName || !ladderID || !ladderManager || !gameTeamSize || !teamSize || !startDate || !endDate || !surfaceType || !numRungs || !numRungWidth || !teams ) {
            return res.status(400).json({ message: "Please provide all required data" });
        }

        // Check if a ladder with the same name already exists
        const existingLadder = await Ladder.findOne({ ladderName });
        if (existingLadder) {
            return res.status(400).json({ message: 'A ladder with the same name already exists' });
        }

        // Generate ladder positions for each team
        const ladderPositions = generateRandomPositions(numRungs, teams.length);

        // Create an array to store team IDs
        const teamIds = [];

        // Iterate through each team
        for (let i = 0; i < teams.length; i++) {
            const { name, captainUsername } = teams[i];

            // Check if the team exists
            const team = await Team.findOne({ teamName: name });
            if (!team) {
                return res.status(400).json({ message: `Team '${name}' does not exist` });
            }
            
            // Update the team with ladderID and ladderPosition
            await Team.findOneAndUpdate({ teamName: name }, { ladderID, ladderPosition: ladderPositions[i] });

            // Push the team's ID to the array
            teamIds.push(team._id);
        }

        // Create the ladder
        const ladder = await Ladder.create({ 
            ladderName, 
            ladderID,
            ladderManager, 
            gameTeamSize, 
            teamSize,
            startDate,
            endDate,
            surfaceType,
            numRungs,
            numRungWidth,
            teams: teamIds 
        });

        return res.status(201).json({ message: 'Ladder created successfully', ladder });
    } catch (error) {
        console.error('Error creating ladder', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all ladders from database
router.get ('/', async(req,res) => {
    try {
        const ladders = await Ladder.find({}).sort({createdAt:-1})
        
        return res.status(200).json({
            count: ladders.length,
            data: ladders
        });
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
});

// Get a single ladder from database
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const ladders = await Ladder.findById(id)
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({error: 'ladder not found'})
    }

});


// //Delete a single ladder from database
// router.delete('/:id', async(req,res) => {
//     const {id} = req.params
//     const ladders = await Ladder.findOneAndDelete({_id:id})
//     if (!ladders) {
//         res.status(404).json({error: 'ladder not found'})
//     }
//     return res.status(200).json(ladders)
// });

router.delete('/:id', async (req, res) => {
    try {
        const ladderId = req.params.id;

        // Find and delete the ladder
        const deletedLadder = await Ladder.findByIdAndDelete(ladderId);

        if (!deletedLadder) {
            return res.status(404).json({ error: 'Ladder not found' });
        }

        // Update teams associated with the deleted ladder
        await Team.updateMany({ ladderID: ladderId }, { $unset: { ladderID: '', ladderPosition: '' } });

        return res.status(200).json({ message: 'Ladder deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


//Update a ladder "ladderManager"
router.put('/:id/manager', async(req,res) => {
    try {
        if(
            !req.body.ladderManager
        ) {
            return res.status(400).send ({
                message: 'Send all required field: ladderManager',
            });
        }  
        const {id} = req.params;
        const ladders = await Ladder.findByIdAndUpdate(id, req.body);
        if (!ladders) {
            return res.status(404).json({message: 'ladder not found'})
        }
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.put('/:id/name', async(req,res) => {
    try {
        if(
            !req.body.ladderName
        ) {
            return res.status(400).send ({
                message: 'Send all required field: ladderName',
            });
        }  
        const {id} = req.params;
        const ladders = await Ladder.findByIdAndUpdate(id, req.body);
        if (!ladders) {
            return res.status(404).json({message: 'ladder not found'})
        }
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});


router.get('/:ladderID/teams', async (request, response) => {
    try {
        const { ladderID } = request.params;
        
        const teams = await Team.find({ ladderID });

        //return response.status(200).json(teams);

        return response.status(200).json({
            count: teams.length,
            data: teams
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;