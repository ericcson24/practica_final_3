"use client"
import { Character } from "@/lib/types"
import styles from "./CharacterCard.module.css"

type CharacterProps = {
    Character:Character
}

export default function CharacterCard({Character}:CharacterProps) {
    return(
        <div className={styles.card}>
            <h4>{Character.name}</h4>
            <span className={styles.info}>Altura: {Character.height} cm</span>
            <span className={styles.info}>Peso: {Character.mass} kg</span>
            <span className={styles.info}>Género: {Character.gender}</span>
            <span className={styles.info}>Nacimiento: {Character.birth_year}</span>
        </div>
    )
    
}