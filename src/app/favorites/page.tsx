"use client"
import { useCharacterContext } from "@/context/CharacterContext"
import Link from "next/link"
import styles from "./favourites.module.css"

export default function FavouritesPage() {
    const { CharacterFavList, removeFromFav } = useCharacterContext()

    if (CharacterFavList.length === 0) {
        return (
            <div className={styles.page}>
                <h1>Favoritos</h1>
                <p className={styles.empty}>No tienes personajes en favoritos.</p>
                <Link href="/characters" className={styles.back}>← Volver a personajes</Link>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <h1>Favoritos</h1>
            <Link href="/characters" className={styles.back}>← Volver a personajes</Link>
            {CharacterFavList.map((character) => (
                <div key={character.url} className={styles.item}>
                    <div className={styles.info}>
                        <Link href={`/characters/${character.url}`}>
                            <h2>{character.name}</h2>
                        </Link>
                        <p>{character.gender} · {character.birth_year} · {character.homeworld}</p>
                    </div>
                    <div className={styles.controls}>
                        <button onClick={() => removeFromFav(character)}>✕</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

