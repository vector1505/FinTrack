import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { compareValue } from "../utils/bcrypt.js";
import { hashValue } from "../utils/bcrypt.js";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
    omitPassword: () => Omit<UserDocument, 'password'>;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        select: true,
        required: true
    }
},{
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.omitPassword = function(): Omit<UserDocument, "password">
{
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.methods.comparePassword = async function(password: string){
    return compareValue(password, this.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;