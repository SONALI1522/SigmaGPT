import mongoose from "mongoose";
import { messageSchema } from "../Schema/MessageSchema.js";

const MessageModel = mongoose.model("message", messageSchema);

export { MessageModel };
