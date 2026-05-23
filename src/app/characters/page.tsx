"use client"

import { useEffect, useState } from "react"
import { getCharacterByURL, GetCharacters } from "@/lib/api"
import CharacterCard from "@/components/CharacterCard"
import { Character } from "@/lib/types"


export default function CharactersPage(){

    const [loading,setloading] = useState<boolean>(true)
    const [error,seterror] = useState<string>("")
    const [Character,setCharacter] = useState <Character[]|null>(null)


    useEffect(()=>{
        const fetchCharacters = async() =>{
            try{
                const data=  await GetCharacters()
                setCharacter(data)
            }catch{
                setloading(false)
                seterror("Error al mostrar personajes")
            }finally{
                setloading(false)
            }

        }
        fetchCharacters()
    })




    return (
        <div>
            <div>
                <h1>Personajes:</h1>
            </div>

            <div>
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar datos</p>}
                
                <div>
                    {Character?.map((character)=>(<CharacterCard key={character.name} Character={character}/>))}
                </div>
            </div>

        </div>
    )
}