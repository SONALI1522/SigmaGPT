import mongoose from "mongoose";
import { ThreadSchema } from "../Schema/ThreadSchema.js";

const ThreadModel = mongoose.model("thread", ThreadSchema);

export { ThreadModel };
