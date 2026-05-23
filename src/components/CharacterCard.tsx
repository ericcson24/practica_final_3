"use client"
import { Character } from "@/lib/types"
import styles from "./CharacterCard.module.css"
import Link from "next/link"
import { useCharacterContext } from "@/context/CharacterContext"

type CharacterProps = {
    Character:Character
}

export default function CharacterCard({Character}:CharacterProps) {
    const id = Character.url.split('/').filter(Boolean).pop()
    const { CharacterFavList, addToFav, removeFromFav } = useCharacterContext()
    const isFav = CharacterFavList.some((c) => c.name === Character.name)

    return(
        <div className={styles.cardWrapper}>
            <Link href={`/characters/${id}`}>
                <div className={styles.card}>
                    <h4>{Character.name}</h4>
                    <span className={styles.info}>Altura: {Character.height} cm</span>
                    <span className={styles.info}>Peso: {Character.mass} kg</span>
                    <span className={styles.info}>Género: {Character.gender}</span>
                    <span className={styles.info}>Nacimiento: {Character.birth_year}</span>
                </div>
            </Link>
            <button
                className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`}
                onClick={() => isFav ? removeFromFav(Character) : addToFav(Character)}
            >
                {isFav ? "★ Quitar" : "☆ Favorito"}
            </button>
        </div>
    )
}