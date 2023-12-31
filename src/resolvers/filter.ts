import { CharacterModel, CharacterModelType } from "../db/character.ts";
import { LocationModel, LocationModelType } from "../db/location.ts";
import { Request, Response } from "express";

export const filterCharactersByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const statusSort = req.params.status;
        if (typeof statusSort !== "string" || statusSort.match(/\d+/g) || !statusSort) {
            res.status(400).send("Invalid status format");
            return;
        }
        const validStatus: string[] = ["Alive", "Dead", "unknown"];
        if (!validStatus.includes(statusSort)) {
            res.status(400).send("Invalid status. Make sure its well written");
            return;
        }
        const found = await CharacterModel.find({ status: statusSort }).exec();
        if (found.length > 0) {
            const result = found.map((character: CharacterModelType): CharacterModelType => ({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin,
                location: character.location,
                created: character.created
            }));
            res.status(200).send(result);
        } else {
            res.status(404).send("No characters found in database with that status");
        }

    } catch {
        res.status(500).send("Error getting filtered characters by status");
        return;
    }
};

export const filterCharactersByGender = async (req: Request, res: Response): Promise<void> => {
    try {
        const genderSort = req.params.gender;
        if (typeof genderSort !== "string" || genderSort.match(/\d+/g) || !genderSort) {
            res.status(400).send("Invalid gender format");
            return;
        }
        const validGenders: string[] = ["Female", "Male", "Genderless", "unknown"];
        if (!validGenders.includes(genderSort)) {
            res.status(400).send("Invalid gender. Make sure its well written");
            return;
        }
        const found = await CharacterModel.find({ gender: genderSort }).exec();
        if (found.length > 0) {
            const result = found.map((character: CharacterModelType): CharacterModelType => ({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin,
                location: character.location,
                created: character.created
            }));
            res.status(200).send(result);
        }
        res.status(404).send("No characters found in database with that gender");
    } catch {
        res.status(500).send("Error getting filtered characters by gender");
        return;
    }
};

export const filterLocationsByType = async (req: Request, res: Response): Promise<void> => {
    try {
        const typeSort = req.params.type;
        if (typeof typeSort !== "string" || typeSort.match(/\d+/g) || !typeSort) {
            res.status(400).send("Invalid type format");
            return;
        }
        const found = await LocationModel.find({ type: typeSort }).exec();
        if (found.length > 0) {
            const result = found.map((location: LocationModelType): LocationModelType => ({
                id: location.id,
                name: location.name,
                type: location.type,
                dimension: location.dimension,
                created: location.created
            }));
            res.status(200).send(result);
        }
        res.status(404).send("No locations found in database with that type");
    } catch {
        res.status(500).send("Error getting filtered locations by type");
        return;
    }
};

export const filterLocationsByDimension = async (req: Request, res: Response): Promise<void> => {
    try {
        const dimensionSort = req.params.dimension;
        if (typeof dimensionSort !== "string" || dimensionSort.match(/\d+/g) || !dimensionSort) {
            res.status(400).send("Invalid dimension format");
            return;
        }
        const found = await LocationModel.find({ dimension: dimensionSort }).exec();
        if (found.length > 0) {
            const result = found.map((location: LocationModelType): LocationModelType => ({
                id: location.id,
                name: location.name,
                type: location.type,
                dimension: location.dimension,
                created: location.created
            }));
            res.status(200).send(result);
        }
        res.status(404).send("No locations found in database with that dimension");
    } catch {
        res.status(500).send("Error getting filtered locations by dimension");
        return;
    }
};