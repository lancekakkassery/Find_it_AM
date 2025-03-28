import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import React from 'react'
import ItemDetail from './ItemDetail.jsx'

function ItemList({ items = [], loading = false }) {
    const [selectedItem, setSelectedItem] = useState(null);

    // Format time (using a placeholder for now)
    const formatTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'AM' : 'AM'; // Always AM for the demo
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const closeItemDetail = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <div className='item-list'>
                <h2>Items Found:</h2>
                {loading ? (
                    <p>Loading items...</p>
                ) : (
                    <div className="items-container">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className="item-card" onClick={() => handleItemClick(item)}>
                                    <div className="item-icon">
                                        <img src="https://via.placeholder.com/40" alt="Item" />
                                    </div>
                                    <div className="item-details">
                                        <h3 className="item-title">
                                            {item.name || (item.tag ? `${item.tag} ${index + 1}` : `Item ${index + 1}`)}
                                        </h3>
                                        <p className="item-description">
                                            {item.description || (item.location && item.location.building 
                                                ? `${item.location.building}${item.location.room ? ', Room ' + item.location.room : ''}` 
                                                : `Description`)}
                                        </p>
                                    </div>
                                    <div className="item-time">
                                        {formatTime()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No items found</p>
                        )}
                    </div>
                )}
            </div>
            
            {selectedItem && (
                <ItemDetail item={selectedItem} onClose={closeItemDetail} />
            )}
        </>
    );
}

export default ItemList;