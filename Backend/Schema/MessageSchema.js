import { Schema } from "mongoose";
export const MessageSchema = new Schema({
    role: {
        type: String,
        enum:["user", "assistant"],
        required: true
    },
    content:{
        type: String,
        content:true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
