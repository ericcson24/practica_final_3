"use client"
import { useFilmContext } from "@/context/FilmContext"
import Link from "next/link"

export default function FavouritesPage() {
    const { FilmCardList, FilmCardListPush, FilmCardListPop } = useFilmContext()

    if (FilmCardList.length === 0) {
        return (
            <div>
                <h1>Favoritos</h1>
                <p>No tienes películas en carrito.</p>
                <Link href="/">Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Carrito</h1>
            <Link href="/">Volver al inicio</Link>
            {FilmCardList.map((item) => (
                <div key={item.Film.episode_id}>
                    <Link href={`/film/${item.Film.episode_id}`}>
                        <h2>{item.Film.title}</h2>
                    </Link>
                    <p>Episodio: {item.Film.episode_id}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <button onClick={() => FilmCardListPush(item)}>+</button>
                    <button onClick={() => FilmCardListPop(item)}>-</button>
                </div>
            ))}
        </div>
    )
}
