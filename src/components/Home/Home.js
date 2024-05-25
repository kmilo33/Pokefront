import React, { useEffect, useState } from 'react';
import './Home.css';
import { Pokecard } from '../Pokecard/Pokecard';
import loadingPacman from '../../assets/LoadingPacman.svg';
import ReactPaginate from 'react-paginate';
import Search from '../Search/Search';
import Pokelist from '../Pokelist/Pokelist';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Home page where you can watch all the pokemon, search by name and choose your favorites
const Home = () => {
    const pokesPerPage = 20;
    const [pokeData, SetPokeData] = useState({});
    const [totalPokes, setTotalPokes] = useState(0);
    const [pokeFound, setPokeFound] = useState(false);
    const [favorites, setFavorites] = useLocalStorage('favorites', []);
    const [favoritesData, setFavoritesData] = useLocalStorage('favoritesData', []);
    const error = undefined;

    const transformData = (data) => data.results;
    const dataPromise = async (query, signal) => await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`, {signal});

    // Initial request
    useEffect(() => {
        const getPokes = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokesPerPage}`);
            const data = await res.json();
            setTotalPokes(data.count);
            SetPokeData(data);
        };

        getPokes();
    }, []);

    // Request depending of the paginator
    const pokeFetch = async (currentPage = 1) => {
        const offset = currentPage*pokesPerPage;
        const res = await  fetch (`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokesPerPage}`);
        const data = await res.json();
        setTotalPokes(data.count);
        return data;
    };

    /*
      It executes when page is changed
      params: {data.selected = page choosed in paginator}
    */
    const handlePageClick = async (data = {selected: 0}) => {
        const pokes = await pokeFetch(data.selected);
        SetPokeData(pokes);
    };

    /*
      It executes when a Search by name is completed
      params: data = Is the pokemon dat's of the unique pokemon 
      that you search with the autocomplete input
    */
    const handleSearch = async (data) => {
        setTotalPokes(1);
        SetPokeData(data);
        setPokeFound(true);
    };

    // It executes when you click on button "view all" to watch all the pokemon list again
    const handleCancelSearch = async () => {
        handlePageClick();
        setPokeFound(false);
    };

    /* 
       Returns a Boolean, that way Pokecard component knows if that Pokemon 
       is choosed as favorite or not
    */
    const isFavorite = (id) => favorites.indexOf(id) >= 0

    /* 
      Modify favorites list in the localstorage to persist 
      the favorites that you choosed without a database
      params: id is the id of the pokemon choosed to add or remove from favorites
      indexfavorite is the index of the pokemon inside the array of favorites 
            (if indexFavorite = -1 the pokemon didn't exist inside the array so we 
            have to add it as a new favorite, if this number is >= 0 it means already 
            exist and we have to delete it from the favorites list)
      data The data asociated to the pokemon we are trying to add/remove from favorite list
    */
    const modifyFavorites = async (id, indexFavorite, data) => {
        const tempFavorites = [...favorites]
        const tempFavoritesData = [...favoritesData]
        if(indexFavorite < 0) {
            setFavorites([...tempFavorites, id]);
            setFavoritesData([...tempFavoritesData, data]);
        } else {
            tempFavorites.splice(indexFavorite, 1);
            setFavorites(tempFavorites);
            tempFavoritesData.splice(indexFavorite, 1);
            setFavoritesData(tempFavoritesData);
        }
    };

    return (
        <div>
        <div className="search">
            <h1>PokeHome</h1>
            <div className="note"><p>You can watch more details just click into the Pokemon or add them to Favorites with the Star</p></div>
            <Search id="pokeName" name="pokeName" label="Enter Pokemon name" 
                placeholder="Enter Pokemon name" autoComplete={true}
                styles={{label: 'label', input: 'input'}} debounceWait={400}
                pokeList={(items, activeIndex, chooseOption, changeActualIndex) => 
                <Pokelist items={items} activeIndex={activeIndex} onClick={chooseOption} 
                onMouseOver={changeActualIndex}/>} promise={dataPromise} onSearchComplete={handleSearch}
                noPokesFound={() => <div>No Pokemon found with that name</div>} onSearchCancel={handleCancelSearch}
                errorMessage={() => <div>Error: Something went wrong!</div>} transformData={transformData}
            />
        </div>
        {error && <h3>Error: {error}</h3>}
        {pokeData &&
            <div className='pokecard-container'>
                    <div className="pokecards">
                        { pokeFound ? <Pokecard key={pokeData.name} pokeInfo={pokeData} favorites={favorites} modifyFavorites={modifyFavorites} isFavorite={isFavorite} showFavButton={true}  isDetailView={false} /> :
                        pokeData?.results?.map((infoPokemon) => (
                                <Pokecard key={infoPokemon.name} pokeInfo={infoPokemon} favorites={favorites} modifyFavorites={modifyFavorites} isFavorite={isFavorite} showFavButton={true}  isDetailView={false} />
                            ))
                        }
                    </div>
                { pokeData &&
                        <ReactPaginate previousLabel={'<'} nextLabel={'>'} breakLabel={'...'}
                        pageCount={Math.ceil(totalPokes/pokesPerPage)} marginPagesDisplayed={3}
                        pageRangeDisplayed={3} onPageChange={handlePageClick} 
                        containerClassName={'pagination justify-content-center'} 
                        pageClassName={'item pagination-page '} pageLinkClassName='page-link' 
                        previousClassName={"item previous"} previousLinkClassName='page-link' 
                        nextClassName={"item next "} nextLinkClassName='page-link' 
                        breakClassName={'item break-me '} breakLinkClassName='page-link' 
                        activeClassName={'item active '} disabledClassName={'disabled-page'}
                    />
                }
            </div>
        }
        </div>
    );
}

export default Home;