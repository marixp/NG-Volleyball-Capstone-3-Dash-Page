import mongoose from "mongoose"
const Schema = mongoose.Schema

//ladder Schema 
const ladderSchema = new Schema ({
    ladderManager: {
        type: String,
        required: true
    },
    ladderID: {
        type: Number,
        required: true,
        unique: true
    },
    ladderName: {
        type: String,
        required: true
    }, 
    gameTeamSize: {
        type: String,
        enum:['2v2','3v3','4v4','5v5','6v6'],
        required: true,
    },
    teamSize: {
        type: Number, 
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    surfaceType : {
        type: String,
        enum: ['Beach/Sand', 'Indoor', 'Grass'],
        required: true
    },
    numRungs: {
        type: Number,
        required: true
    },
    numRungWidth: {
        type: Number,
        required: true
    },
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'teams'}],

});

export const Ladder = mongoose.model('ladders',ladderSchema)