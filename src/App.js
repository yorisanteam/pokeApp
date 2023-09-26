import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemon = async () => {
    const minNum = 1;
    const maxNum = 1020;
    let randNum = Math.floor(Math.random()*(maxNum+1-minNum)) + minNum;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randNum}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('ポケモン情報の取得に失敗しました。', error);
    }
  }

  useEffect(() => {
    fetchPokemon();
  },[]);

  const handleButtonClick = () => {
    fetchPokemon();
  };


  return (
    <div className='App'>
      <h1>ポケアップ</h1>
      <button onClick={handleButtonClick}>ポケモンを取得</button>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name}
          />
        </div>
      )}
    </div>
  );
}

export default App;
