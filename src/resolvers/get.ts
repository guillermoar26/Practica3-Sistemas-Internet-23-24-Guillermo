import { CharacterModel, CharacterModelType } from "../db/character.ts";
import { LocationModel, LocationModelType } from "../db/location.ts";
import { Request, Response } from "express";

export const getCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || !id) {
            res.status(400).send("Invalid id format");
        }
        const exists = await CharacterModel.findOne({ id }).exec();
        if (exists) {
            res.status(200).send({
                id: exists.id,
                name: exists.name,
                status: exists.status,
                species: exists.species,
                gender: exists.gender,
                origin: exists.origin,
                location: exists.location,
                created: exists.created,
            });
        } else {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character/${id}`,
            );

            if (response.status !== 200) {
                res.status(404).send(`Character with id ${id} does not exist`);
                return;
            }

            const data: CharacterModelType = await response.json();
            const { name, status, species, gender, origin, location, created } = data;

            const newcharacter = new CharacterModel({
                id,
                name,
                status,
                species,
                gender,
                origin,
                location,
                created,
            });

            await newcharacter.save();
            const newLocationObject = newcharacter.toObject();
            delete newLocationObject._id; delete newLocationObject.__v;

            res.status(200).send(newLocationObject);
        }
    } catch {
        res.status(500).send("Error fetching specified character");
        return;
    }
};

export const getLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || !id) {
            res.status(400).send("Invalid id format");
            return;
        }
        const exists = await LocationModel.findOne({ id }).exec();
        if (exists) {
            res.status(200).send({
                id: exists.id,
                name: exists.name,
                type: exists.type,
                dimension: exists.dimension,
                created: exists.created,
            });
        } else {
            const response = await fetch(
                `https://rickandmortyapi.com/api/location/${id}`,
            );

            if (response.status !== 200) {
                res.status(404).send(`Location with id ${id} does not exist`);
                return;
            }

            const data: LocationModelType = await response.json();
            const { name, type, dimension, created } = data;


            const newlocation = new LocationModel({
                id,
                name,
                type,
                dimension,
                created,
            });

            await newlocation.save();
            const newLocationObject = newlocation.toObject();
            delete newLocationObject._id; delete newLocationObject.__v;

            res.status(200).send(newLocationObject);
        }
    } catch {
        res.status(500).send("Error fetching specified location");
        return;
    }
};

export const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.params.page);
        if (isNaN(page) || page < 1 || page > 42 || !page) {
            res.status(400).send("Invalid page");
            return;
        }

        const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${page}`,
        );

        const data = await response.json();
        const names = data.results.map((character: CharacterModelType): string => character.name);
        res.status(200).send(names);
    } catch {
        res.status(500).send("Error fetching all characters");
        return;
    }
};

export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.params.page);
        if (isNaN(page) || page < 1 || page > 7 || !page) {
            res.status(400).send("Invalid page");
            return;
        }

        const response = await fetch(
            `https://rickandmortyapi.com/api/location/?page=${page}`,
        );

        const data = await response.json();
        const names = data.results.map((locations: LocationModelType): string => locations.name);
        res.status(200).send(names);
    } catch {
        res.status(500).send("Error fetching all locations");
        return;
    }
};