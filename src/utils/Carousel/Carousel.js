import React, { useEffect, useState } from 'react';
import './Carousel.css'
import Aipom from '../../assets/Aipom.svg';
import Arbok from '../../assets/Arbok.svg';
import Arcanine from '../../assets/Arcanine.svg';
import Bayleef from '../../assets/Bayleef.svg';
import Bulbasaur1 from '../../assets/Bulbasaur1.svg';
import Bulbasaur2 from '../../assets/Bulbasaur2.svg';
import Charmander from '../../assets/Charmander.svg';
import Chikorita from '../../assets/Chikorita.svg';
import Clefairy1 from '../../assets/Clefairy1.svg';
import Clefairy2 from '../../assets/Clefairy2.svg';
import Cyndaquil from '../../assets/Cyndaquil.svg';
import Ditto from '../../assets/Ditto.svg';
import Growlithe from '../../assets/Growlithe.svg';
import Hypno from '../../assets/Hypno.svg';
import Igglybuff from '../../assets/Igglybuff.svg';
import Jigglypuff1 from '../../assets/Jigglypuff1.svg';
import Jigglypuff2 from '../../assets/Jigglypuff2.svg';
import Jolteon from '../../assets/Jolteon.svg';
import Kingler from '../../assets/Kingler.svg';
import Machoke from '../../assets/Machoke.svg';
import Machop from '../../assets/Machop.svg';
import Meowth1 from '../../assets/Meowth1.svg';
import Meowth2 from '../../assets/Meowth2.svg';
import Mew from '../../assets/Mew.svg';
import Mewtwo from '../../assets/Mewtwo.svg';
import MrMime from '../../assets/MrMime.svg';
import Ninetails from '../../assets/Ninetails.svg';
import Onix from '../../assets/Onix.svg';
import Pichu from '../../assets/Pichu.svg';
import Pikachu1 from '../../assets/Pikachu1.svg';
import Pikachu2 from '../../assets/Pikachu2.svg';
import Pikachu3 from '../../assets/Pikachu3.svg';
import Pikachu4 from '../../assets/Pikachu4.svg';
import Pikachu5 from '../../assets/Pikachu5.svg';
import Pikachu6 from '../../assets/Pikachu6.svg';
import Pikachu7 from '../../assets/Pikachu7.svg';
import Pikachu8 from '../../assets/Pikachu8.svg';
import Pikachu9 from '../../assets/Pikachu9.svg';
import Pikachu10 from '../../assets/Pikachu10.svg';
import Pikachu11 from '../../assets/Pikachu11.svg';
import Pokeball from '../../assets/Pokeball.svg';
import Poliwag from '../../assets/Poliwag.svg';
import Psyduck from '../../assets/Psyduck.svg';
import Quilava from '../../assets/Quilava.svg';
import Rapidash from '../../assets/Rapidash.svg';
import Squirtle from '../../assets/Squirtle.svg';
import Tangrowth from '../../assets/Tangrowth.svg';
import Ultraball from '../../assets/Ultraball.svg';
import Venomoth from '../../assets/Venomoth.svg';
import Vulpix from '../../assets/Vulpix.svg';
import Wartortle from '../../assets/Wartortle.svg';
import Wigglytuff from '../../assets/Wigglytuff.svg';
import Zubat from '../../assets/Zubat.svg';

const assetsArray = [
  Aipom, Arbok, Arcanine, Bayleef, Bulbasaur1, Bulbasaur2, Charmander, Chikorita, Clefairy1, 
  Clefairy2, Cyndaquil, Ditto, Growlithe, Hypno, Igglybuff, Jigglypuff1, Jigglypuff2, Jolteon, 
  Kingler, Machoke, Machop, Meowth1, Meowth2, Mew, Mewtwo, MrMime, Ninetails, Onix, Pichu, 
  Pikachu1, Pikachu2, Pikachu3, Pikachu4, Pikachu5, Pikachu6, Pikachu7, Pikachu8, Pikachu9, 
  Pikachu10, Pikachu11, Pokeball, Poliwag, Psyduck, Quilava, Rapidash, Squirtle, Tangrowth, 
  Ultraball, Venomoth, Vulpix, Wartortle, Wigglytuff, Zubat
];

// Carousel of images showed in the login page
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const changeSvg = () => {
      const randomIndex = Math.floor(Math.random() * assetsArray.length);
      setCurrentIndex(randomIndex);
    };

    const intervalId = setInterval(changeSvg, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  });

  return (
    <div>
      <img className='Pokelogo' src={assetsArray[currentIndex]} alt='Carousel' />
    </div>
  );
};

export default Carousel;