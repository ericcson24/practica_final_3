import axios from "axios";
import { Film } from "./types";


const api=axios.create({
    baseURL:"https://swapi.info/api",
    timeout:10000
})


export async function getAllFilms():Promise<Film[]> {
    try{
        const FilmResponse= await api.get<Film[]>("/films")
        return FilmResponse.data
    }catch(error){
        console.error ("Error al coger todas las pelis")
        throw error}
}

export async function GetFilmByID(id:string) {
    try{
        const FilmResponse = await api.get<Film>(`/films/${id}`)
        return FilmResponse.data
    }catch(error){
        console.error("Error al coger peli con id")
        throw error
    }
}

export async function getCharacterByURL(url:string){
    try{
        // aqui esoty haciendo axios.get, no api.get, porque todo viene de urls completas, no relativas a la baseURL del api, entonces no puedo usar el api creado con axios.create, porque ese api ya tiene una baseURL definida, entonces uso axios.get directamente para hacer la petición a la url completa que me dan los datos de las pelis
        const response = await axios.get(url)
        return response.data
    }catch(error){
        console.error("Error al coger personaje por URL")
        throw error
    }
}

//https://swapi.info/api/people

export async function GetCharacters() {
    try{
        const response = await api.get("/people")
        return response.data
    }catch(error){
        console.error("Error al coger datos de la api")
        throw error
    }
    
}

export async function getCharacterbyId(id:string) {
    try{
        const response = await api.get(`/people/${id}`)
        return response.data
    }catch(error){
        console.error("Error de api loading")
        throw error
    }
    
}

export async function getFilmsFromCharacters(id:string) {
    
}