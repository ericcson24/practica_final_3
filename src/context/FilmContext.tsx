"use client"
import { FilmItem } from "@/lib/types"
import { createContext, ReactNode, useContext, useState } from "react";

// Forma que tiene el contexto: la lista y las dos funciones para añadir/quitar
type FilmCardStruct = {
    FilmCardList: FilmItem[]             // array con todas las películas del carrito
    FilmCardListPush: (item: FilmItem) => void;  // añadir o incrementar cantidad
    FilmCardListPop: (item: FilmItem) => void;   // quitar o decrementar cantidad
}

// Creamos el contexto con valor inicial null (hasta que el Provider lo rellene)
const FilmContext = createContext<FilmCardStruct | null>(null)

// Provider: envuelve la app y da acceso al contexto a todos los componentes hijos
export const FilmProvider = ({ children }: { children: ReactNode }) => {

    // Estado principal: array de películas en el carrito
    const [FilmCardList, setFilmCardList] = useState<FilmItem[]>([])

    // Añadir película al carrito
    const FilmCardListPush = (item: FilmItem) => {
        // Si la película NO está en el carrito todavía → la añadimos con cantidad 1
        if (!FilmCardList.some((i) => i.Film.episode_id === item.Film.episode_id)) {
            setFilmCardList([...FilmCardList, { ...item, quantity: 1 }])
        } else {
            // Si YA está → recorremos la lista y sumamos 1 a la que coincide
            setFilmCardList(FilmCardList.map((i) =>
                i.Film.episode_id === item.Film.episode_id
                    ? { ...i, quantity: i.quantity + 1 }  // esta es, incrementamos
                    : i                                    // las demás no se tocan
            ))
        }
    }

    // Quitar película del carrito
    const FilmCardListPop = (item: FilmItem) => {
        // Solo actuamos si la película está en el carrito
        if (FilmCardList.some((i) => i.Film.episode_id === item.Film.episode_id)) {
            // Buscamos el item actual para ver su cantidad
            const found = FilmCardList.find((i) => i.Film.episode_id === item.Film.episode_id)!
            if (found.quantity === 1) {
                // Si solo queda 1 → la eliminamos del array directamente
                setFilmCardList(FilmCardList.filter((e) => e.Film.episode_id !== item.Film.episode_id))
            } else {
                // Si hay más de 1 → restamos 1 a la cantidad
                setFilmCardList(FilmCardList.map((i) =>
                    i.Film.episode_id === item.Film.episode_id
                        ? { ...i, quantity: i.quantity - 1 }  // esta es, decrementamos
                        : i                                    // las demás no se tocan
                ))
            }
        }
    }

    // Exponemos la lista y las funciones a todos los componentes dentro del Provider
    return (
        <FilmContext.Provider value={{ FilmCardList, FilmCardListPush, FilmCardListPop }}>
            {children}
        </FilmContext.Provider>
    )
}

// Hook personalizado para consumir el contexto fácilmente desde cualquier componente
export const useFilmContext = () => {
    const context = useContext(FilmContext) // leemos el contexto actual
    if (!context) {
        // Si se usa fuera del Provider, lanzamos error para avisar al desarrollador
        throw new Error("useFilmContext must be used within a FilmProvider")
    }
    return context
}
