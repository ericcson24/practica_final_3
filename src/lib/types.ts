export type Film ={
    episode_id:number;
    title:string;
    opening_crawl:string;
    characters:string[]

}

export type FilmItem ={
    Film:Film
    quantity:number
}

export type Character= {
    name:string
    homeworld:string
    height:string
    mass:string
    gender:string
    birth_year:string
    films:string[]
    url:string

}