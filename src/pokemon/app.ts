import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.178.0/http/file_server.ts";

import { getPokemonDetails, getPokemonList } from "./api.ts";

async function handler(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);

  if (requestUrl.pathname === "/pokemon") {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") || "10";
    const offset = url.searchParams.get("offset") || "0";

    const pokemonList = await getPokemonList({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return new Response(JSON.stringify(pokemonList), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  if (requestUrl.pathname.startsWith("/pokemon/")) {
    const pokemonId = requestUrl.pathname.split("/")[2];
    const pokemonDetails = await getPokemonDetails(pokemonId, "ja");

    return new Response(JSON.stringify(pokemonDetails), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return serveFile(request, "src/test.html");
}

serve(handler);
