import React from 'react';
import './Pokecard.css';
import { useFetch } from '../../hooks/useFetch';
import loadingPacman from '../../assets/LoadingPacman.svg';
import { TbStarFilled } from "react-icons/tb";
import { TbStar } from "react-icons/tb";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from '../../hooks/useLocalStorage';

// A component to show a card with the pokemon image, name and a button to add/remove from favorites
export const Pokecard = ({pokeInfo, favorites, modifyFavorites, isFavorite, showFavButton}) => {
  const {data, loading} = useFetch(pokeInfo.url);
  const navigate = useNavigate();
  const [detailPokeData, setDetailPokeData] = useLocalStorage('detailPokeData', {});
  const findIndex = () => {
    return favorites.indexOf(data.id)
  }

  /* It executes when you are trying to add/remove a favorite pokemon from the list 
     (Check Home.js to see how modifyFavorites works)
  */
  const handleOnClick = (e) => {
    modifyFavorites(Number(data.id), findIndex(), pokeInfo)
  }

  // It navigate to the details page when you click on a pokemon's image
  const goToDetails = (event) => {
    event.stopPropagation();
    setDetailPokeData(data);
    navigate("/details/"+data.id);
  }

  return (
    <div className='card'>
      {loading && <img className='loading' src={loadingPacman} alt='Carouse2' />}
      {!loading && data &&
        <div className='pokecontainer'>
            <img onClick={goToDetails} className='pokeSprite' key={data.id} src={data.sprites.front_default} alt={data.id}/>
            <p key={data.name}>{data.name}</p>
            {showFavButton && <button id={data.id} className="iconButton" onClick={handleOnClick}><IconContext.Provider value={{ color: "yellow", className: "icon" }}>{isFavorite(data.id) &&<TbStarFilled className="icon" id={data.id} color="yellow" size={30} />}{!isFavorite(data.id) && <TbStar id={data.id} color="yellow" />}</IconContext.Provider></button>}
        </div>
        }
    </div>
  )
}