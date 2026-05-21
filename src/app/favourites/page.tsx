"use client"
import { useFilmContext } from "@/context/FilmContext"
import Link from "next/link"
import styles from "./favourites.module.css"

export default function FavouritesPage() {
    const { FilmCardList, FilmCardListPush, FilmCardListPop } = useFilmContext()

    if (FilmCardList.length === 0) {
        return (
            <div className={styles.page}>
                <h1>Carrito</h1>
                <p className={styles.empty}>No tienes películas en carrito.</p>
                <Link href="/" className={styles.back}>← Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <h1>Carrito</h1>
            <Link href="/" className={styles.back}>← Volver al inicio</Link>
            {FilmCardList.map((item) => (
                <div key={item.Film.episode_id} className={styles.item}>
                    <div className={styles.info}>
                        <Link href={`/film/${item.Film.episode_id}`}>
                            <h2>{item.Film.title}</h2>
                        </Link>
                        <p>Episodio: {item.Film.episode_id}</p>
                    </div>
                    <div className={styles.controls}>
                        <button onClick={() => FilmCardListPop(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => FilmCardListPush(item)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

