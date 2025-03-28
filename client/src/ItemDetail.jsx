import React from 'react';
import './App.css';

function ItemDetail({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="item-detail-overlay">
      <div className="item-detail-container">
        <div className="item-detail-header">
          <h2>{item.name || 'Item Details'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="item-detail-content">
          <div className="item-detail-image">
            <img src="https://via.placeholder.com/150" alt={item.name} />
          </div>
          <div className="item-detail-info">
            <p><strong>Tag:</strong> {item.tag || 'N/A'}</p>
            <p><strong>Description:</strong> {item.description || 'No description available'}</p>
            
            {item.location && (
              <>
                <p><strong>Location:</strong></p>
                {item.location.building && <p>Building: {item.location.building}</p>}
                {item.location.room && <p>Room: {item.location.room}</p>}
                {item.location.latitude && <p>Latitude: {item.location.latitude}</p>}
                {item.location.longitude && <p>Longitude: {item.location.longitude}</p>}
              </>
            )}
            
            {item.tagNumber && <p><strong>Tag Number:</strong> {item.tagNumber}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail; 