"use client"
import { useFilmContext } from "@/context/FilmContext"
import { Film, FilmItem } from "@/lib/types"
import styles from "./FilmDetailCard.module.css"

type FilmProps = {
    Film:Film
}

export default function FilmDetailCard({Film}:FilmProps) {

    const { FilmCardList, FilmCardListPush, FilmCardListPop } = useFilmContext()

    const itemEnCarrito = FilmCardList.find((i) => i.Film.episode_id === Film.episode_id)
    const cantidad = itemEnCarrito?.quantity ?? 0

    const handleAdd = () => {
        const item: FilmItem = { Film, quantity: 1 }
        FilmCardListPush(item)
    }

    const handleRemove = () => {
        const item: FilmItem = { Film, quantity: cantidad }
        FilmCardListPop(item)
    }

    return(
        <div className={styles.card}>
            <h2>{Film.title}</h2>
            <p className={styles.episode}>Episodio {Film.episode_id}</p>
            <p className={styles.crawl}>{Film.opening_crawl}</p>

            <div className={styles.controls}>
                <p>En carrito: {cantidad}</p>
                <button onClick={handleAdd}>+ Añadir</button>
                {cantidad > 0 && (
                    <button onClick={handleRemove}>- Quitar</button>
                )}
            </div>
        </div>
    )
    
}