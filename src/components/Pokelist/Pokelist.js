import React from 'react'
import './Pokelist.css'

// The list under the autocomplete input, It shows the list of options depeding of the input
const Pokelist = ({items, activeIndex, onClick, onMouseOver}) => {
  return (
    <ul className='pokelistContainer'>
        {items.map((item, index) =>
            <li id={index} className={`pokelistItem ${index === activeIndex ? "activeItem": ""}`} key={index} onClick={onClick} onMouseOver={onMouseOver}>{item.name}</li>
        )}
    </ul>
  )
}

export default Pokelist;