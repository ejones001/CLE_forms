import React, { useState } from 'react';
import axios from 'axios';

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  const fetchCharacterDetail = async () => {
    const publicKey = '20e7e726e2ba036817fc00152501ab22';
    const privateKey = '7a18294ce68ff01bea1d3922c98fa62af40ca898';
    const ts = '1'; // Timestamp for the request
    const hash = '835f6ef33f8f8510e2d218d18f1ed465'; // Calculate using 1 + privateKey + publicKey and MD5 hash

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await axios.get(url);
      setCharacter(response.data.data.results[0]);
    } catch (error) {
      console.error('Error fetching character detail:', error);
    }
  };

  useEffect(() => {
    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.map(comic => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
