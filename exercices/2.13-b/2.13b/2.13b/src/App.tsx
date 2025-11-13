import { useState } from 'react'
import './App.css'
import RandomDog from './RandomDog'

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className='image-content'>
        <RandomDog key={`${refresh}`} />
        <RandomDog key={`${refresh}`} />
        <RandomDog key={`${refresh}`} />
      </div>

      <div className='buttom'>
        <button onClick={() => setRefresh(!refresh)}>
          Refresh Dog Image
        </button>
      </div>
    </>
  )
}

export default App
