import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <div className="app">
      <h1>Marvel Comics Characters</h1>
      <div className="container">
        <div className="left-panel">
          <CharacterList onSelectCharacter={handleCharacterSelect} />
        </div>
        <div className="right-panel">
          {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
        </div>
      </div>
    </div>
  );
};

export default App;
