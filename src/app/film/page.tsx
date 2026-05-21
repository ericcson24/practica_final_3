"use client"
import { getAllFilms } from "@/lib/api"
import { Film } from "@/lib/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SearchPage (){

    const [Film, setFilm] = useState<Film[]|null>(null)
    const [busqueda,setbusqueda] = useState("")
    const [error,seterror]=useState<string>("")
    const [loading,setloading]=useState<boolean>(true)


    useEffect (()=>{
        let mounted=true;

        const fetchFilms = async () => {
            setloading(true)
            seterror("")

            try{
                const query = busqueda.trim()
                const data=await getAllFilms()
                const filteredFilms = data.filter((Film)=>
                    Film.title.toLowerCase().includes(query.toLowerCase())
                )
                if (mounted) {
                    setFilm(filteredFilms)
                }
            }catch(error){
                if (mounted) {
                    seterror("Error fetching films")
                }
            }finally{
                if (mounted) {
                    setloading(false)
                }
            }
        }
        fetchFilms()
        return () => {
            mounted = false
        }
    }, [busqueda])

    return(
        <div>
            <h1>Buscar Películas de Star Wars</h1>
            <input
                type="text"
                placeholder="Escribe el título de la película..."
                value={busqueda}
                onChange={(e) => setbusqueda(e.target.value)}
            />
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && Film && (
                <Link href={`/film/${Film[0].episode_id}`}>
                    {Film.map((film) => (
                        <li key={film.episode_id}>{film.title}</li>
                    ))}
                </Link>
            )}
        </div>
    )

}
