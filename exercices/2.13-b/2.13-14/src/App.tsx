import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

interface Joke{
  joke: string,
  category: string
}

function App() {
  const [joke, setJoke] = useState<Joke | undefined>(undefined);
  console.log(joke);


  useEffect(() => {
    fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    .then((response) => {if(!response.ok) throw new Error(`Fetch error ${response.status} : ${response.statusText}`
      );
    return response.json();
  })
    .then((joke) => setJoke(joke))
    .catch((err) => {console.log(err)});
  }, [])

  return (
    <div className="container">
    <h1 className="title">Random Joke Generator</h1>

    <div className="joke-card">
      {joke ? (
        <>
          <p className="joke-text">“{joke.joke}”</p>
          <span className="joke-category">{joke.category}</span>
        </>
      ) : (
        <p className="loading">Loading a random joke...</p>
      )}
    </div>
  </div>
  )
}

export default App
