import './App.css';
import React, { useState, useEffect } from 'react';
import pokeData from './poke.json';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [guessedName, setGuessedName] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hint1, setHint1] = useState(null);
  const [hint2, setHint2] = useState(null);
  const [hint3, setHint3] = useState(null);


  const getRandomPokemon = () => {
    const randomPokemonId = Math.floor(Math.random()*1010) + 1;
    const japaneseName = pokeData[randomPokemonId - 1].ja;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`).then((response) => response.json()).then((data) => {
      setPokemonData({
        id: randomPokemonId,
        ja: japaneseName,
        height: data.height / 10,
        weight: data.weight / 10,
        type: data.types.map(type => type.type.name),
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
      setScore(prevScore => prevScore + 1);
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

  const handleHint1 = () => {
    setHint1(`高さ：${pokemonData.height}`)
  }

  const handleHint2 = () => {
    setHint2(`重さ：${pokemonData.weight}`)
  }

  const handleHint3 = () => {
    setHint3(`タイプ：${pokemonData.type.join(', ')}`)
  }


  return (
    <div className='App'>
      <h1>Guess the Pokemon</h1>
      <h2>Score: {score}</h2>
      {pokemonData && (
        <>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.ja}
          />
          <div className='hintButton'>
            <Button variant="contained" onClick={handleHint1}>ヒント1</Button>
            <Button variant="contained" onClick={handleHint2}>ヒント2</Button>
            <Button variant="contained" onClick={handleHint3}>ヒント3</Button>
          </div>
          <div className='hint'>
            {hint1 && <p>{hint1}</p>}
            {hint2 && <p>{hint2}</p>}
            {hint3 && <p>{hint3}</p>}
          </div>
          <h3>Input Pokemon Name</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              label="名前"
              variant="standard"
              type="text"
              value={guessedName}
              onChange={handleInputChange}
            />
            <Button color="success" size='large' variant='contained' type="submit" disabled={isSubmitted}>回答</Button>
          </form>
          {isCorrect === true && <p>正解!</p>}
          {isCorrect === false && (
            <p>不正解。正解は{pokemonData.ja}です。</p>
          )}
          <div className='NextButton'>
            <Button variant='contained' disableElevation onClick={handleNext}>次へ</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
