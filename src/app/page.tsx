"use client"
import styles from "./page.module.css";
import FilmCard from "@/components/FilmCard";
import { useEffect, useState } from "react";
import { Film } from "@/lib/types";
import { getAllFilms } from "@/lib/api";

export default function Home() {
  const [Films,setFilms] = useState<Film[]>([]);
  const [loading,setloading] = useState<boolean>(true);
  const [error,seterror] = useState<string>("");


  useEffect(()=>{
    let EstaMontado=true;

    const fetchFilms = async () =>{
      setloading(true);
      seterror("");

      try{
        const data=await getAllFilms()
        if (EstaMontado){
          setFilms(data);
        }
      }catch{
        if (EstaMontado){
          seterror("Error al coger las pelis")
          setFilms([])
        }
      }finally{
        if (EstaMontado){
          setloading(false);
        }
      }
    }

    fetchFilms();

    return ()=>{
      EstaMontado=false;
    }
  },[])

  return (
    <div className={styles.page}>
      <h1>App para ver pelis de star wars</h1>
      <h2>Películas:</h2>
      {loading && <p className={styles.status}>Cargando...</p>}
      {error && <p className={styles.status}>{error}</p>}
      <div className={styles.grid}>
        {Films.map((Film)=>(
          <FilmCard key={Film.episode_id} Film={Film}/>
        ))}
      </div>
    </div>
  );
}
