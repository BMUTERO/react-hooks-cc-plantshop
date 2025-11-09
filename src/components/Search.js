import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  // Handle input changes
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;

