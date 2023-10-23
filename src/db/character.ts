import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    status: { type: String, require: true },
    species: { type: String, require: true },
    gender: { type: String, require: true },
    origin: {
        name: { type: String, required: true },
        url: { type: String, required: false },
    },
    location: {
        name: { type: String, required: true },
        url: { type: String, required: false },
    },
    created: { type: Date, require: true },
});

export type CharacterModelType = {
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    origin: {
        name: string,
        url?: string,
    },
    location: {
        name: string,
        url?: string,
    },
    created: Date,
};

export const CharacterModel = mongoose.model<CharacterModelType>("Characters", CharacterSchema);