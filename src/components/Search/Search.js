import React, { useState } from 'react'
import useSearchPokeName from '../../hooks/useSearchPokeName'
import './Search.css'

// Component to show and control the input where you can search for Pokemon by names
const Search = ({id, name, label, placeholder, autoComplete, styles, debounceWait, pokeList, noPokesFound, errorMessage, transformData, promise, onSearchComplete, onSearchCancel}) => {
    const [query, setQuery] = useState("");
    const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
    const [activeIndex, setActiveIndex] = useState(null);
    const [showCancelSeach, setshowCancelSearch] = useState(false);
    const [data, setData, error] = useSearchPokeName(query, transformData, promise, debounceWait, isAutoComplete);

    // It executes when "view all" button is pressed to restart the input and show all the pokemon again
    const handleCancelSearch = () => {
        onSearchCancel();
        setshowCancelSearch(false);
        setQuery("");
    };

    /* It executes when you do a focus on the input to Search
       (That way if we click inside the input the autocomplete list is showed)
     */
    const handleFocus = () => {
        setIsAutoComplete(true);
    };
  
    /* It executes when you do a focus on another element different to the input to Search
       (That way if we click outside the input the autocomplete list hides)
     */
    const handleBlur = () => {
        setTimeout(() => {
            setIsAutoComplete(false)
          }, 500);
    };

    // It control the query when you are writting over the input
    const handleChange = (event) => {
        setQuery(event.target.value)
    }
    
    /* It listen the key up event in the input, 
       that way the autocomplete list could be choosed with arrow keys
    */
    const handleKeyUp = (event) => {
        const keyCode = event.keyCode;
        // Button enter
        if(keyCode === 13) {
            chooseOption();
            return;
        }
        setIsAutoComplete(true);
        if (!data || data.length === 0) return;
        // Button arrow down 
        if (keyCode === 40) {
            if(activeIndex === null || activeIndex === data.length - 1) {
                setActiveIndex(0);
            } else {
                setActiveIndex((prevIndex) => Number(prevIndex) + 1);
            }
        }
        // Button arrow up 
        if (keyCode === 38) {
            if(activeIndex === 0) {
                setActiveIndex(data.length-1);
            } else {
                setActiveIndex((prevIndex) => Number(prevIndex) - 1);
            }
        }
    }

    /* It executed when you choose an option of the autocomplete list of the input, 
       that way you search for a specific pokemon
    */
    function chooseOption(e = false) {
        setIsAutoComplete(true);
        const newIndex = !!e ? e.target.id : activeIndex;
        if(activeIndex === null) return
        setQuery(data[newIndex].name);
        setActiveIndex(null);
        onSearchComplete(data[newIndex]);
        setshowCancelSearch(true);
        setData(null);
        setIsAutoComplete(false);
    }

    /* It change the selected item from the autocomplete list when mouse is over the option
       (We use this option in the Home.js file, look onMouseOver={changeActualIndex} )
    */
    function changeActualIndex(e) {
        setActiveIndex(e.target.id);
    }

  return <>
    <label className="label" htmlFor={name}>{label}</label>
    <br />
    <div className="searchContainer">
        <input
            name={name} className="input" id={id} value={query} onChange={handleChange} placeholder={placeholder}
            autoComplete='off' onKeyUp={handleKeyUp} onFocus={handleFocus} onBlur={handleBlur}
        />
        {showCancelSeach && <button className="cancelSearch" onClick={handleCancelSearch}>View all</button>}
    </div>
        {data && data.length > 0 && pokeList(data, activeIndex, chooseOption, changeActualIndex)}
        {query && data && data.length === 0 && noPokesFound()}
        {error && errorMessage()}
  </>
}

export default Search;