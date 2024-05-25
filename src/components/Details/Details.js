import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './Details.css'

/* 
   Details view where you can look for Pokemon's details
   (I used the localstorae to avoid a request looking for pokemon details again)
*/
export const Details = () => {
  const [detailPokeData, setDetailPokeData] = useLocalStorage('detailPokeData', {});

  // Class to choose the right styles depending of the Pokemon's type
  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'normal':
        return 'normal';
      case 'fire':
        return 'fire';
      case 'water':
        return 'water';
      case 'electric':
        return 'electric';
      case 'grass':
        return 'grass';
      case 'ice':
        return 'ice';
      case 'fighting':
        return 'fighting';
      case 'poison':
        return 'poison';
      case 'ground':
        return 'ground';
      case 'flying':
        return 'flying';
      case 'psychic':
        return 'psychic';
      case 'bug':
        return 'bug';
      case 'rock':
        return 'rock';
      case 'ghost':
        return 'ghost';
      case 'dragon':
        return 'dragon';
      case 'dark':
        return 'dark';
      case 'steel':
        return 'steel';
      case 'fairy':
        return 'fairy';
      case 'stellar':
        return 'stellar';
      case 'unknown':
        return 'unknown';
      default:
        return '';
    }
  };

  return (
    <div>
      {detailPokeData &&<div className="details">
        <h1>{detailPokeData.name}</h1>
        <div className='detailContainer'>
            <div className='detailCard'>
              {detailPokeData &&
                <div className='pokeDetail'>
                    <img className='detailSprite' key={detailPokeData.id} src={detailPokeData.sprites.front_default} alt={detailPokeData.id}/>
                    <p key={detailPokeData.name}>{detailPokeData.name}</p>
                </div>
                }
            </div>
            <div className='detailedData'>
              <label htmlFor='types'>Types</label>
              <ul id="types">
                {detailPokeData.types.map((type) => <li key={type.type.name} className={getTypeClass(type.type.name)}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>)}
              </ul>
              <label htmlFor='audio-latest'>Latest Cries in games</label>
              <audio id="audio-latest" controls>
                <source src={detailPokeData.cries.latest} type="audio/ogg" />If you can see this, you browser is not compatible with this audio files, sorry
              </audio>
              <label htmlFor='audio-legacy'>Legacy Cries in games</label>
              <audio id="audio-legacy" controls>
                <source src={detailPokeData.cries.legacy} type="audio/ogg" />If you can see this, you browser is not compatible with this audio files, sorry
              </audio>
              <label htmlFor='abilities'>Abilities</label>
              <ul id="abilities">
                {detailPokeData.abilities.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}
              </ul>
              <label htmlFor='weight'>Weight</label>
              <p id="weight">
                {detailPokeData.weight} Kg
              </p>
              <label htmlFor='height'>Height</label>
              <p id="height">
                {detailPokeData.height/10} m
              </p>
            </div>
        </div>
      </div>}
    </div>
  )
}