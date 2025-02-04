import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        default: 'lastName'
    },
    location:{
        type: String,
        default: 'location'
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

});

export default mongoose.model('User', UserSchema);