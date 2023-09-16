import { useEffect, useState } from 'react';
import { PokeCard } from '../PokeCard';
import PokemonListEmpty from './PokemonList.empty';

type pokemonResponse = {
  name: string;
  url: string;
};

type pokemon = {
  id: string;
  name: string;
  url: string;
  image: string;
};

async function getPokemons() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const { results } = await res.json();

  const pokemons = results.map((poke: pokemonResponse, index: number) => {
    const idPokemon = index + 1;
    return {
      id: idPokemon,
      ...poke,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`,
    };
  });

  return pokemons;
}

type PokemonListT = {
  filter: string;
};

export default function PokemonList({ filter }: PokemonListT) {
  const [pokemons, setPokemons] = useState<pokemon[]>([]);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch('/api/pokemons');
      const { pokemons } = await response.json();
      setPokemons(
        pokemons.filter((pokemon: pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    };

    getPokemons();
  }, [filter]);

  return pokemons.length > 0 ? (
    <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map((pokemon: pokemon) => (
        <PokeCard key={`poke-${pokemon.id}`} {...pokemon} />
      ))}
    </div>
  ) : (
    <PokemonListEmpty />
  );
}
