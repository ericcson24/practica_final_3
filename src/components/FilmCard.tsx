"use client"

import Link from "next/link"
import { Film } from "@/lib/types"
import styles from "./FilmCard.module.css"

type FilmProps = {
    Film:Film
}

export default function FilmCard({Film}:FilmProps){
    return (
        <Link href={`/film/${Film.episode_id}`} className={styles.card}>
            <h3>{Film.title}</h3>
            <span className={styles.arrow}>›</span>
        </Link>
    )
}