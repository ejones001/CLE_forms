import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const publicKey = '20e7e726e2ba036817fc00152501ab22';
      const privateKey = '7a18294ce68ff01bea1d3922c98fa62af40ca898';
      const ts = '1'; // Timestamp for the request
      const hash = '835f6ef33f8f8510e2d218d18f1ed465'; // Calculate using 1 + privateKey + publicKey and MD5 hash

      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="character-list">
      {characters.map(character => (
        <div key={character.id} className="character-item">
          <h2>{character.name}</h2>
          <img src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`} alt={character.name} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
