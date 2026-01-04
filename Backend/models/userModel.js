import mongoose from "mongoose";
import { userSchema } from "../Schema/UserSchema.js";

const UsersModel = mongoose.model("user", userSchema);

export { UsersModel };
