import React, { useEffect, useRef } from 'react';
import './SearchBar.css';

function Sidebar({ show, onClose, children }) {
  const ref = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    if (show) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [show, onClose]);

  return (
    <div className={`sidebar ${show ? 'show' : ''}`} ref={ref}>
      <div className="sidebar-header">
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="sidebar-content">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;