import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapControl,
  ControlPosition
} from '@vis.gl/react-google-maps';

import MyNavBar from './NavBar.jsx'
import ItemList from './ItemList.jsx'
import SearchBar from './SearchBar.jsx'

function App() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    colorNeeded: false,
    freeNeeded: false,
    lessThan20Pgs: false,
    moreThan20Pgs: false
  });
  
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/api/locations");
      console.log("API response:", response.data); 
      setLocations(response.data);
      setFilteredLocations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Apply search and filters whenever they change
  useEffect(() => {
    let results = [...locations];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => {
        return (
          (item.name && item.name.toLowerCase().includes(query)) ||
          (item.tag && item.tag.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.location && item.location.building && 
           item.location.building.toLowerCase().includes(query))
        );
      });
    }
    
    // Apply filters
    if (activeFilters.colorNeeded) {
      results = results.filter(item => item.colorNeeded);
    }
    
    if (activeFilters.freeNeeded) {
      results = results.filter(item => item.freeNeeded);
    }
    
    if (activeFilters.lessThan20Pgs) {
      results = results.filter(item => item.pages && item.pages < 20);
    }
    
    if (activeFilters.moreThan20Pgs) {
      results = results.filter(item => item.pages && item.pages >= 20);
    }
    
    setFilteredLocations(results);
  }, [searchQuery, activeFilters, locations]);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };
  
  const position = { lat: 30.6097085, lng: -96.3538729 }; // cstat area
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(16);
  
  // Create markers from filtered location data
  const markers = filteredLocations.map((item, index) => {
    if (item.location && item.location.latitude && item.location.longitude) {
      return {
        id: item._id || index,
        position: {
          lat: parseFloat(item.location.latitude) || 30.6097085,
          lng: parseFloat(item.location.longitude) || -96.3538729
        },
        item: item
      };
    }
    return null;
  }).filter(marker => marker !== null);

  return ( 
    <>
    <MyNavBar/>     {/* NavBar wrapper from import on the top, (wrapper is a react component) */}
    <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
    <ItemList items={filteredLocations} loading={isLoading} />
    <APIProvider apiKey={'AIzaSyCG726Rj10Q_Oq4OT_FgF0HStvJ0gLT2Tk'}>
      <div className='map-container'> 
        <Map 
        zoom={zoom}
        onZoomChanged={ev => setZoom(ev.detail.zoom)} // allows user to use zoom button seen in bottom right corner
        defaultCenter={position} 
        mapId={"2811d00f86aaab58"} // google map id
        gestureHandling={'greedy'} // allows it to be moveable
        >
          <MapControl position={ControlPosition.LEFT_BOTTOM}></MapControl>
          
          {/* Display markers for each item */}
          {markers.map((marker) => (
            <AdvancedMarker 
              key={marker.id} 
              position={marker.position} 
              onClick={() => setOpen(marker.id)}
            >
              <Pin
                background={"maroon"}
                glyphColor={"white"}
                scale={1}
              />
              {open === marker.id && (
                <InfoWindow 
                  position={marker.position} 
                  onCloseClick={() => setOpen(false)}
                >
                  <div>
                    <h3>{marker.item.name || marker.item.tag || 'Item'}</h3>
                    <p>{marker.item.description || 'No description'}</p>
                    {marker.item.location && marker.item.location.building && (
                      <p>Building: {marker.item.location.building}</p>
                    )}
                    {marker.item.location && marker.item.location.room && (
                      <p>Room: {marker.item.location.room}</p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </AdvancedMarker>
          ))}
          
        </Map>
      </div>
    </APIProvider>
    </>
  )
}

export default App
