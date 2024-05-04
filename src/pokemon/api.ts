import { Pokemon, PokemonListResponse, PokemonSpecies } from "./model.ts";

const POKEMON_API_V2_URL = "https://pokeapi.co/api/v2";

function generatePokemonAPI({
  type = "pokemon",
  limit = 20,
  offset = 0,
}: {
  type: string;
  limit: number;
  offset: number;
}): URL {
  const url = new URL(`${POKEMON_API_V2_URL}/${type}`);

  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("offset", offset.toString());

  return url;
}

export async function getPokemonList({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<PokemonListResponse> {
  const url = generatePokemonAPI({ type: "pokemon", limit, offset });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

export async function getPokemonDetails(
  id: string | number,
  language?: string,
) {
  const response = await Promise.all([getPokemonSpecies(id), getPokemon(id)]);

  if (!language) {
    return response;
  }

  const [species, pokemon] = response;

  species.flavor_text_entries = species.flavor_text_entries.filter(
    (entry) => entry.language.name === language,
  );

  species.genera = species.genera.filter(
    (entry) => entry.language.name === language,
  );

  species.names = species.names.filter(
    (entry) => entry.language.name === language,
  );

  pokemon.name =
    species.names.find((entry) => entry.language.name === language)?.name ||
    pokemon.name;

  return pokemon;
}

export async function getPokemon(id: string | number): Promise<Pokemon> {
  const url = generatePokemonAPI({
    type: "pokemon",
    limit: 1,
    offset: 0,
  });
  url.pathname = `${url.pathname}/${id}`;

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

export async function getPokemonSpecies(
  id: string | number,
): Promise<PokemonSpecies> {
  const url = generatePokemonAPI({
    type: "pokemon-species",
    limit: 1,
    offset: 0,
  });
  url.pathname = `${url.pathname}/${id}`;

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}
