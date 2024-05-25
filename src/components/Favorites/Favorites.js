import React from 'react'
import './Favorites.css'
import { Pokecard } from '../Pokecard/Pokecard';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Favorite view where you can watch the pokemon that you choose as favorites
export const Favorites = () => {
  const [favoritesData, setFavoritesData] = useLocalStorage('favoritesData', []);
  return (
    <div className="title">
      <h1>Your PokeFavorites</h1>
      <div className='favorites-container'>
        <div className="pokefavorites">
            {favoritesData?.map((infoPokemon) => (
                    <Pokecard key={infoPokemon.name} pokeInfo={infoPokemon} showFavButton={false}  isDetailView={false} />
                ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites;
