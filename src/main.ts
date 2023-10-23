import express from "express";
import mongoose from "mongoose";
import { load } from "load";

import { getAllCharacters, getAllLocations, getCharacter, getLocation } from "./resolvers/get.ts";
import { deleteCharacter, deleteLocation } from "./resolvers/delete.ts";
import { filterCharactersByGender, filterCharactersByStatus, filterLocationsByDimension, filterLocationsByType } from "./resolvers/filter.ts";

const env = await load();

const mongo_usr: string = env["MONGO_USR"];
const mongo_pwd: string = env["MONGO_PWD"];
const mongo_uri: string = env["MONGO_URI"];
const db_name: string = env["DB_NAME"];

if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(`mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`);

const miapp = express();
miapp.use(express.json());

miapp
  .get("/allCharacters/:page", getAllCharacters)
  .get("/allLocations/:page", getAllLocations)
  .get("/getCharacter/:id", getCharacter)
  .get("/getLocation/:id", getLocation)
  .get("/filterCharactersByStatus/:status", filterCharactersByStatus)
  .get("/filterCharactersByGender/:gender", filterCharactersByGender)
  .get("/filterLocationsByType/:type", filterLocationsByType)
  .get("/filterLocationsByDimension/:dimension", filterLocationsByDimension)
  .delete("/deleteCharacter/:id", deleteCharacter)
  .delete("/deleteLocation/:id", deleteLocation);

miapp.listen(3000, (): void => {
  console.log("Sever ready on: http://localhost:3000/");
});