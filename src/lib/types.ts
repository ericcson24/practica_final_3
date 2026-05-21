export type Film ={
    episode_id:number;
    title:string;
    opening_crawl:string;
}

export type FilmItem ={
    Film:Film
    quantity:number
}