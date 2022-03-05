export interface Game{
  id:string,
  background_image:string,
  name:string,
  released:string,
  metacritic_url:string,
  website:string,
  description:string,
  metacritic:number,
  generes:Array<Genere>;
  parent_platforms:Array<Parent_Platform>;
  publishers:Array<Publishers>;
  ratings:Array<Rating>;
  screenshots:Array<Screenshots>;
  trailers:Array<Trailer>
}

export interface APIResponse<T>{
  results:Array<T>
}

interface Genere{
  name:string;
}
interface Parent_Platform{
  platform:{
    name:string,
    slug:string,
  };
}
interface Publishers{
  name:string;
}
interface Rating{
  id:number;
  count:number;
  title:string;
}
interface Screenshots{
  image:string;
}
interface Trailer{
  data: {
    max:string;
  };
}