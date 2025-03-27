import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import React from 'react'

function Filter() {
    
    const [CheckedColor,setCheckedColor] = React.useState(false)
    const [CheckedLocation,SetCheckedLocation] = React.useState(false)

    const handleCheckedColor =()=>{
        setCheckedColor(!CheckedColor)
    }
    const handleCheckedLocation =()=>{
        SetCheckedLocation(!CheckedLocation)
    }
    
    return (
      <>
        <div className='filter'>
            <h2>Filter</h2>
            
        </div>
      </>
    );
  }
  
  export default Filter;