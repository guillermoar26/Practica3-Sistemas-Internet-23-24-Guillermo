import { CharacterModel } from "../db/character.ts";
import { LocationModel } from "../db/location.ts";
import { Request, Response } from "express";

export const deleteCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || !id) {
            res.status(400).send("Invalid id format");
            return;
        }
        const deletedCharacter = await CharacterModel.findOneAndDelete({ id: id }).exec();
        if (!deletedCharacter) {
            res.status(404).send(`Character with id ${id} not found in database`);
            return;
        }
        res.status(200).send(`Character with id ${id} removed successfully`);
    } catch {
        res.status(500).send("Internal server error");
        return;
    }
};

export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || !id) {
            res.status(400).send("Invalid id format");
            return;
        }
        const deletedLocation = await LocationModel.findOneAndDelete({ id: id }).exec();
        if (!deletedLocation) {
            res.status(404).send(`Location with id ${id} not found in database`);
            return;
        }
        res.status(200).send(`Location with id ${id} removed successfully`);
    } catch {
        res.status(500).send("Internal server error");
        return;
    }
};