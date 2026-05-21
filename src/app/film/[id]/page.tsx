"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Film } from "@/lib/types";
import { GetFilmByID } from "@/lib/api";
import FilmDetailCard from "@/components/FilmDetailCard";
import Link from "next/link";
import styles from "./film.module.css";

export default function FilmPage(){

    const params =useParams<{id:string}>()
    const id=params?.id;

    const [Film,setFilm] = useState<Film|null>(null);
    const [loading,setloading] = useState<boolean>(true);
    const [error,seterror] = useState<string>("")

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
                setFilm(data)
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
            <Link href="/" className={styles.back}>← Volver al inicio</Link>
            {loading && <p className={styles.status}>Cargando...</p>}
            {error && <p className={styles.status}>{error}</p>}
            {!loading && !error && Film && (
                <FilmDetailCard Film={Film}/>
            )}
        </div>
    )
}