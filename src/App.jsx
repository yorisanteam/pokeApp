import './App.css';
import React, { useState, useEffect } from 'react';
import pokeData from './poke.json';


function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [guessedName, setGuessedName] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getRandomPokemon = () => {
    const randomPokemonId = Math.floor(Math.random()*1010) + 1;
    const japaneseName = pokeData[randomPokemonId - 1].ja;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`).then((response) => response.json()).then((data) => {
      setPokemonData({
        id: randomPokemonId,
        ja: japaneseName,
      });
    });
  };

  useEffect(() => {
    getRandomPokemon();
  },[]);

  const handleInputChange = (e) => {
    setGuessedName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guessedName === pokemonData.ja) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setGuessedName('');
    setIsCorrect(null);
    getRandomPokemon();
    setIsSubmitted(false);
  }


  return (
    <div className='App'>
      <h1>Guess the Pokemon</h1>
      {pokemonData && (
        <>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.ja}
          />
          <form onSubmit={handleSubmit}>
            <label>
              Enter the Pokemon's name:
              <input
                type="text"
                value={guessedName}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" disabled={isSubmitted}>Submit</button>
          </form>
          {isCorrect === true && <p>正解!</p>}
          {isCorrect === false && (
            <p>不正解。正解は{pokemonData.ja}です。</p>
          )}
          <button onClick={handleNext}>Next</button>
        </>
      )}
    </div>
  );
};

export default App;
