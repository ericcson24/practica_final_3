import axios from "axios";
import { Film } from "./types";


const api=axios.create({
    baseURL:"https://swapi.info/api/films",
    timeout:10000
})

export async function getAllFilms():Promise<Film[]> {
    try{
        const FilmResponse= await api.get<Film[]>("")
        return FilmResponse.data
    }catch(error){
        console.error ("Error al coger todas las pelis")
        throw error}
}

export async function GetFilmByID(id:string) {
    try{
        const FilmResponse = await api.get<Film>(id)
        return FilmResponse.data
    }catch(error){
        console.error("Error al coger peli con id")
        throw error
    }
}