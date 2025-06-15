import { useState } from 'react'
import './App.css'
import './SearchBar.css';
//import axios from "axios"
import React from 'react'
import Accordion from "react-bootstrap/Accordion";


function SearchBar({niches = [], onSearch, onFilterChange }) {
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
  const handleClear = () => {
    setSearchQuery("");
    onSearch?.("");          // tell parent “no query”
  };
  
    const toggle = (filterName) => {
    const updatedFilters = {
      ...filters,
      [filterName]: !filters[filterName],
    };
    setFilters(updatedFilters);

    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="search">
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
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  x
                </button>

          </div>
        </div>

        <Accordion flush alwaysOpen className="niche-accordion">
        {niches.map((niche, i) => {
          const title =
            niche.charAt(0).toUpperCase() + niche.slice(1); /* pretty */
          return (
            <Accordion.Item eventKey={i} key={niche}>
              <Accordion.Header>{title}</Accordion.Header>
              <Accordion.Body>
                {/* niche‑specific controls */}
                {niche === "printer" && (
                  <>
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.colorNeeded}
                        onChange={() => toggle("colorNeeded")}
                      />
                      <label>Color needed?</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.freeNeeded}
                        onChange={() => toggle("freeNeeded")}
                      />
                      <label>Free needed?</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.lessThan20Pgs}
                        onChange={() => toggle("lessThan20Pgs")}
                      />
                      <label>&lt; 20 pages</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.moreThan20Pgs}
                        onChange={() => toggle("moreThan20Pgs")}
                      />
                      <label>&ge; 20 pages</label>
                    </div>
                  </>
                )}

                {/* fall‑back for other niches */}
                {niche !== "printer" && (
                  <p className="mb-0 small text-muted">
                    No niche‑specific filters… yet!
                  </p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      </div>
    </div>
  );
}

export default SearchBar;

