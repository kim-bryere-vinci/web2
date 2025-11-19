import { useState } from 'react'
import './App.css'
import RandomDog from './RandomDog'
import { useEffect } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(dog => !dog);
    }, 3000)
    return () =>  clearInterval(interval);
  }, []);

  return (
    <>
      <div className='image-content'>
        <RandomDog key={`${refresh}1`} />
        <RandomDog key={`${refresh}2`} />
        <RandomDog key={`${refresh}3`} />
      </div>

      <div className='buttom'>
        
      </div>
    </>
  )
}

export default App
