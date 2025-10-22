import { useState, type SyntheticEvent } from 'react'
import './App.css'
import FilmMenu from './FilmMenu'
import type { Film } from './types'


const defaultFilms = [
  {
    id:1,
    titre: "Inception",
    director: "Christopher Nolan",
    duree: 148,
    imageUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
    description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets doit accomplir une mission presque impossible : implanter une idée dans l'esprit d'une cible.",
    budget: 160_000_000
  },
  {
    id:2,
    titre: "Interstellar",
    director: "Christopher Nolan",
    duree: 169,
    imageUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg",
    description: "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité de l'extinction.",
    budget: 165_000_000
  },
  {
    id:3,
    titre: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duree: 136,
    imageUrl: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1188_.jpg",
    description: "Un pirate informatique découvre que la réalité qu’il connaît n’est qu’une simulation et rejoint la résistance pour libérer l’humanité.",
    budget: 63_000_000
  },
  {
    id:4,
    titre: "Parasite",
    director: "Bong Joon-ho",
    duree: 132
  },
  {
    id:5,
    titre: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    duree: 178,
    imageUrl: "https://m.media-amazon.com/images/I/81EBpXO9eDL._AC_SL1500_.jpg",
    description: "Un jeune hobbit hérite d’un anneau maléfique et entreprend une quête périlleuse pour le détruire.",
    budget: 93_000_000
  }
]

function App() {
  const [films, setFilms] = useState(defaultFilms);
  const [titre, setTitre] = useState("");
  const [director, setDirector] = useState("");
  const [duree, setDureee] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBugdet] = useState(0);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit:", titre, director, duree);
    const newFilm= {
      id: nextFilmId(films),
      titre: titre,
      director: director,
      duree: duree,
      imageUrl: imageUrl,
      description: description,
      budget: budget
    }

    setFilms([...films, newFilm]);
  }

  const handleTitreChange = (e: SyntheticEvent) => {
    const titreInput = e.target as HTMLInputElement;
    console.log("change in titreInput:", titreInput.value);
    setTitre(titreInput.value);
  }

  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInpur = e.target as HTMLInputElement;
    console.log("change in directorInput", directorInpur.value);
    setDirector(directorInpur.value);
  }

  const handleDureeChange = (e: SyntheticEvent) => {
    const dureeInput = e.target as HTMLInputElement;
    console.log("change in dureeInput", dureeInput.value);
    setDureee(parseInt(dureeInput.value));
  }

  const handleImageUrlChange = (e: SyntheticEvent) => {
    const imageUrl = e.target as HTMLInputElement;
    console.log("change in imageUrl", imageUrl.value);
    setImageUrl(imageUrl.value);
  }

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const description = e.target as HTMLInputElement;
    console.log("change in description", description.value);
    setDescription(description.value);
  }

  const handleBudgetChange = (e: SyntheticEvent) => {
    const budget = e.target as HTMLInputElement;
    console.log("change in budget", budget.value);
    setBugdet(parseInt(budget.value));
  }


  return (
    <>
      <div className='main'>
        <h1>5 films cultes</h1>
        <FilmMenu films={films} />


        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input type="text" 
          value={titre}
          id='titre'
          name='titre'
          onChange={handleTitreChange}
          required/>

          <label htmlFor="director">Director</label>
          <input type="text" 
          value={director}
          id='director'
          name='director'
          onChange={handleDirectorChange}
          required/>

          <label htmlFor="duree">Duree</label>
          <input type="number" 
          value={duree}
          id='duree'
          name='duree'
          onChange={handleDureeChange}
          required/>

          <label htmlFor="imageUrl">ImageUrl</label>
          <input type="text" 
          value={imageUrl}
          id='imageUrl'
          name='imageUrl'
          onChange={handleImageUrlChange}
          required/>  

          <label htmlFor="description">Description</label>
          <input type="text" 
          value={description}
          id='description'
          name='description'
          onChange={handleDescriptionChange}
          required/>  

          <label htmlFor="budget">Budget</label>
          <input type="number" 
          value={budget}
          id='budget'
          name='budget'
          onChange={handleBudgetChange}
          required/>  

          <button type='submit'>Ajouter</button>
        </form>
      </div>
    </>
  )
}

const nextFilmId = (films: Film[]) => {
  return films.reduce((maxId, film) => Math.max(maxId, film.id), 0)+1;
}

export default App
