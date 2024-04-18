import mongoose from "mongoose"
const Schema = mongoose.Schema


//user schema

const userSchema = new Schema ({
userName:{
type: String,
required: true,
unique: true,
},

fullname:{
type: String,
required: true,
},

accountType: {
    type: String,
    enum: ['Regular', 'Team Captain', 'Admin'],
    
},

password: {
    type: String,
    required: true,
},

gender: {
    type: String,
    required: true,
},

dateOfBirth: {
    type:Date,
    required: true,
},

profilePicture: {
    type: String,
    required: false
},

phoneNumber: {
    type: String,
    required: true,
    
},

playerPosition: {
    type: String,
    required: false
},

experienceLevel: {
    type: String,
    enum: ['Beginner', "Intermediate", "Advanced"],
    required: true
},

bio: {
    type: String,
    required: false
},

token: {
    type: String,
    required: false
},

teamMembershipType: {
    type:String,
    enum: ['Regular','Team Captain','Guest','Ladder Manager','Administrator'],
    
},



},
{timestamps: true});

export const user = mongoose.model('users2',userSchema)