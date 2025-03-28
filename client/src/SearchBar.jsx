import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import React from 'react'

function SearchBar({ onSearch, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    colorNeeded: false,
    freeNeeded: false,
    lessThan20Pgs: false,
    moreThan20Pgs: false
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleFilterChange = (filterName) => {
    const updatedFilters = {
      ...filters,
      [filterName]: !filters[filterName]
    };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className='search'>
      <div className="search-container">
        <div className="search-input-container">
          <label htmlFor="search-input">Find:</label>
          <div className="search-input-wrapper">
            <input
              id="search-input"
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="dropdown-button">▼</button>
          </div>
        </div>

        <div className="specifications-section">
          <h3>Specifications</h3>
          
          <div className="filter-option">
            <input
              type="checkbox"
              id="color-needed"
              checked={filters.colorNeeded}
              onChange={() => handleFilterChange('colorNeeded')}
            />
            <label htmlFor="color-needed">Color needed?</label>
          </div>
          
          <div className="filter-option">
            <input
              type="checkbox"
              id="free-needed"
              checked={filters.freeNeeded}
              onChange={() => handleFilterChange('freeNeeded')}
            />
            <label htmlFor="free-needed">Free needed?</label>
          </div>
          
          <div className="filter-option">
            <input
              type="checkbox"
              id="less-than-20"
              checked={filters.lessThan20Pgs}
              onChange={() => handleFilterChange('lessThan20Pgs')}
            />
            <label htmlFor="less-than-20">Less than 20 Pgs</label>
          </div>
          
          <div className="filter-option">
            <input
              type="checkbox"
              id="more-than-20"
              checked={filters.moreThan20Pgs}
              onChange={() => handleFilterChange('moreThan20Pgs')}
            />
            <label htmlFor="more-than-20">More than 20 Pgs</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;