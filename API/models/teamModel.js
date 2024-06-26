import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
            unique: true,
        },
        ladderID: {
            type: Number,
            required: false,
        },
        captainUsername: {
            type: String,
            required: true,
        },
        challengeID: {
            type: Number,
            required: false,
        },
        ladderPosition: {
            type: Number,
            required: false,
        },
        // Array for User ID affliated with a team *User3 Table is for Testing purposes
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'users2'}],
    },

);

export const Team = mongoose.model('team', teamSchema);