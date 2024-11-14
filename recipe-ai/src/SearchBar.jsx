import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Perform search or handle search logic here
    console.log("Searching for:", query);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
