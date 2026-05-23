"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Character, Film } from "@/lib/types";
import { getCharacterByURL, GetFilmByID } from "@/lib/api";
import FilmDetailCard from "@/components/FilmDetailCard";
import CharacterCard from "@/components/CharacterCard";
import Link from "next/link";
import styles from "./film.module.css";
import cardStyles from "@/components/CharacterCard.module.css";

export default function FilmPage(){

    const params =useParams<{id:string}>()
    const id=params?.id;

    const [Film,setFilm] = useState<Film|null>(null);
    const [loading,setloading] = useState<boolean>(true);
    const [error,seterror] = useState<string>("")
    const [Character, setCharacter]=useState<Character[]|null>(null)

    useEffect(()=>{
        const fetchFilms = async () =>{
            if (!id){
                seterror("no hay id de pelicula")
                setloading(false)
                setFilm(null)
                return
            }
            try{
                const data= await GetFilmByID(id)
                const characters = await Promise.all(data.characters.map((url) => getCharacterByURL(url)))
                setFilm(data)
                setCharacter(characters)
                seterror("")
            }catch{
                seterror("Error al coger la película")
                setFilm(null)

            }finally{
                setloading(false)
            }
        }
        fetchFilms();

    },[id])

    return(
        <div className={styles.page}>
            <Link href="/" className={styles.back}>Volver al inicio</Link>
            {loading && <p className={styles.status}>Cargando...</p>}
            {error && <p className={styles.status}>{error}</p>}
            {!loading && !error && Film && (
                <FilmDetailCard Film={Film}/>
            )}
            {!loading && !error && Character && Character.length > 0 && (
                <div className={cardStyles.section}>
                    <h3>Personajes</h3>
                    <div className={cardStyles.grid}>
                        {Character.map((char, index) => (
                            <CharacterCard key={index} Character={char}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}