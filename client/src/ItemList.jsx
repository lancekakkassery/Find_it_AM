import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import React from 'react'
function ItemList() {
  const [items, setItems] = useState([]);
  //fetching items, this can be replaced with an API call instead
  useEffect(() => {
    const fetchItems = [
      { id: 1, title: "Microwave",description:"Adjacent to Evans Library and Annex", location:"Commons Hall"},
      {id: 2, title:  "Vending Machine",description:"Adjacent to Evans Library and Annex", location: "Evans Library"},
    ];

    setItems(fetchItems);
  }, []);

  return (
      <div className='item-container'>
        <h2>Items Found</h2>
        <div className='items-list'>
          {items.map((item) => (
            <div key={item.id} className='item-card'>
              <div className='item-header'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='item-location'>
                <strong>Location:</strong> {item.location}
              </div>     
            </div>
          ))}
        </div>
      </div>
  );
}

export default ItemList;