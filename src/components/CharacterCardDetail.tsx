"use client"
import { Character } from "@/lib/types"
import styles from "./CharacterCardDetail.module.css"
import { useCharacterContext } from "@/context/CharacterContext"

type CharacterProps = {
    Character:Character
}

export function CharacterDetailCard({Character}:CharacterProps) {
    const { CharacterFavList, addToFav, removeFromFav } = useCharacterContext()
    const isFav = CharacterFavList.some((c) => c.name === Character.name)

    return(
        <div className={styles.card}>
            <h2>{Character.name}</h2>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.label}>Altura</span>
                    <span className={styles.value}>{Character.height} cm</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Peso</span>
                    <span className={styles.value}>{Character.mass} kg</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Género</span>
                    <span className={styles.value}>{Character.gender}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Año de nacimiento</span>
                    <span className={styles.value}>{Character.birth_year}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Planeta natal</span>
                    <span className={styles.value}>{Character.homeworld}</span>
                </div>
            </div>
            <button
                className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`}
                onClick={() => isFav ? removeFromFav(Character) : addToFav(Character)}
            >
                {isFav ? "★ Quitar de favoritos" : "☆ Añadir a favoritos"}
            </button>
        </div>
    )
    
}