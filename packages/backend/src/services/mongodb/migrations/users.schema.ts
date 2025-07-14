import { IUsers } from '@movies/interfaces';
import { Schema, model, Document } from "mongoose";

type UserDocument = IUsers & Document;

const UserSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const UsersDB = model<UserDocument>("User", UserSchema);
