import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true },
    dimension: { type: String, require: false },
    created: { type: String, require: true }
});

export type LocationModelType = {
    id: number,
    name: string,
    type: string,
    dimension?: string,
    created: Date,
};

export const LocationModel = mongoose.model<LocationModelType>("Locations", LocationSchema);