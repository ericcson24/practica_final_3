"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Character, Film } from "@/lib/types"
import { getCharacterbyId, getCharacterByURL } from "@/lib/api"
import { CharacterDetailCard } from "@/components/CharacterCardDetail"
import FilmCard from "@/components/FilmCard"
import styles from "./page.module.css"

export default function CharacetrPageID (){
    const params = useParams<{id:string}>()
    const id= params?.id

    const [error,seterror] = useState<string>("")
    const [loading, setloading] = useState<boolean>(true)
    const [character, setCharacter] = useState<Character|null>(null)
    const [films, setFilms] = useState<Film[]>([])

    useEffect(()=>{
        const fetchCharacters = async()=>{
            if(!id){
                seterror("No hay perosnaje con el id designado")
                return
            }
            try{
                const data = await getCharacterbyId(id)
                setCharacter(data)
                const filmData = await Promise.all(data.films.map((url: string) => getCharacterByURL(url)))
                setFilms(filmData)
                seterror("")
            }catch{
                seterror("error al cargar personaje")
            }finally{
                setloading(false)
            }
        }
        fetchCharacters()
    },[id])


    return(
        <div className={styles.container}>
            {loading && <p className={styles.status}>Cargando...</p>}
            {error && <p className={styles.status}>{error}</p>}

            {character && <CharacterDetailCard key={id} Character={character} />}

            {films.length > 0 && (
                <div className={styles.section}>
                    <h3>Películas</h3>
                    <div className={styles.grid}>
                        {films.map((film) => (<FilmCard key={film.episode_id} Film={film} />))}
                    </div>
                </div>
            )}
        </div>
    )
}