import { useCallback, useContext, useEffect } from 'react';
import { pokeapi_pokemon } from './apis/pokeapi.axios';
import { NxWelcome } from '@jdesjardins/ui';
import { AuthContext } from './context';
import { useAxios } from './hooks';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export function App() {
  // Demo Playground
  const _authCtx = useContext(AuthContext);

  const [pokemon, loading, , getPokemon, cancel] = useAxios<Pokemon>({
    instance: pokeapi_pokemon,
  });

  const getBublasaur = useCallback(
    (pokemon: string) => getPokemon({ url: pokemon }),
    [getPokemon]
  );

  useEffect(() => {
    getPokemon({ url: 'pikachu' });
    return () => {
      cancel();
    };
  }, [getPokemon, cancel]);

  return (
    <main className="App">
      <button
        type="button"
        className="btn btn-primary"
        disabled={loading}
        onClick={() => getBublasaur('bulbasaur')}
      >
        PRESS ME
      </button>
      {pokemon && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <NxWelcome title={pokemon?.name || '...'} />
    </main>
  );
}
