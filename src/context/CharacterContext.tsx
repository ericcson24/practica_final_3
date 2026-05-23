"use client"
import { createContext, ReactNode, useContext, useState } from "react"
import { Character } from "@/lib/types"

type CharacterFavStruct = {
    CharacterFavList: Character[]
    addToFav: (Character: Character) => void
    removeFromFav: (Character: Character) => void
}

const CharacterContext = createContext<CharacterFavStruct | null>(null)

export const CharacterProvider = ({ children }: { children: ReactNode }) => {

    const [CharacterFavList, setCharacterFavList] = useState<Character[]>([])

    const addToFav = (item: Character) => {
        if (!CharacterFavList.some((i) => i.name === item.name)) {
            setCharacterFavList([...CharacterFavList, item])
        }
    }

    const removeFromFav = (item: Character) => {
        if (CharacterFavList.find((i) => i.name === item.name)) {
            setCharacterFavList(CharacterFavList.filter((e) => e.name !== item.name))
        }
    }

    return (
        <CharacterContext.Provider value={{ CharacterFavList, addToFav, removeFromFav }}>
            {children}
        </CharacterContext.Provider>
    )
}

export const useCharacterContext = () => {
    const context = useContext(CharacterContext)
    if (!context) {
        throw new Error("useCharacterContext must be used within a CharacterProvider")
    }
    return context
}