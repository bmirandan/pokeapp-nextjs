import PokemonDetail from './PokemonDetail.component';

export const dynamicParams = false;

export async function generateStaticParams() {
  const pokemons = [...Array(151)].map((_, index) => ({ id: `${index + 1}` }));

  return pokemons;
}

async function getPokemon({ params: { id } }: PokemonPageT) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const post = await res.json();

  return post;
}

type PokemonPageT = {
  params: {
    id: string;
  };
};

export default async function PokemonPage({ params: { id } }: PokemonPageT) {
  const pokemon = await getPokemon({ params: { id } });
  return (
    <div className="flex justify-center h-screen overflow-y-hidden	 ">
      <PokemonDetail {...pokemon} />
    </div>
  );
}