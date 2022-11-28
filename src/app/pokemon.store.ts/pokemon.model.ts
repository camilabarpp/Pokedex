export interface Result {
    name: string;
    url: string;
    pokemonsData: SpecificPokemon;
}

export interface Pokemon {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
}
 


export interface Ability2 {
    name: string;
    url: string;
}

export interface Ability {
    ability: Ability2;
}


export interface Species {
    name: string;
    url: string;
}

export interface DreamWorld {
    front_default: string;
}

export interface Other {
    dream_world: DreamWorld;
}

export interface Sprites {
    front_default: string;
    other: Other;
}

export interface Stat2 {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    stat: Stat2;
}

export interface Type2 {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export interface SpecificPokemon {
    abilities: Ability[];
    id: number;
    is_default: boolean;
    name: string;
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}


