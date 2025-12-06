import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { type MaybeAuthenticated, type AuthenticatedUser, type Movie, type MovieContext, type NewMovie, type User } from "./types";
import { addMovie, deleteMovie, fetchMovies } from "../utils/films-service";

const App = () => {
  const currentTheme = localStorage.getItem("theme") ?? "dark";
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme as "light" | "dark");
  const [authenticatedUser,setAuthenticatedUser] = useState<MaybeAuthenticated>(undefined);

  const loginUser = async (user: User) => {
    try{
      const options = {
        method: "POST", 
        body: JSON.stringify(user),
        Headers: {
          "Content-type": "application/json"
        }
      }

      const response = await fetch("api/auths/login", options);

      if(!response.ok){
        throw new Error(`fetch error: ${response.status} : ${response.statusText}`);
      }

      const authenticatedUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(authenticatedUser);
    }catch(err){
      console.log("loginUser::error", err);
      throw err;
    }

  }

  const registerUser = async (newUser: User) => {
    try{
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const response = await fetch("api/auths/register", options);

      if(!response.ok){
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }

      const createdUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(createdUser);
    }catch(err){
      console.log("registerUser::error", err);
      throw err;
    }
  }

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log('new theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const initMovies = async () => {
    try {
      const movies = await fetchMovies();
      setMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initMovies();
  }, []);

  const onMovieAdded = async (newMovie: NewMovie) => {
    console.log("Movie to add:", newMovie);
    try {
      const movieToBeAdded = await addMovie(newMovie);
      console.log("Movie added:", movieToBeAdded);
      await initMovies();
      navigate("/movie-list");
    } catch (error) {
      console.error(error);
    }
  };

  const onMovieDeleted = async (movie: Movie) => {
    console.log("Movie to delete:", movie);
    try{
      const movietoDelete = await deleteMovie(movie);
      console.log("Movie deleted : ", movietoDelete);
      await initMovies();
      navigate("/movie-list");
    }catch (error) {
      console.error(error);
    }
  }

  const movieContext: MovieContext = {
    movies,
    onMovieAdded,
    onMovieDeleted,
    registerUser,
    loginUser
  };

  return (
    <div>
      <Header urlLogo="https://media.istockphoto.com/id/1429764305/fr/vectoriel/bande-de-film-vierge-isol%C3%A9e-sur-le-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=is5Y6cun0NC8PxJd51p4YnUoLUpyb758Bdigh4Bqn48="
       theme={theme}
       handleThemeChange={handleThemeChange}>
        <h1>Tous sur les films</h1>
        <NavBar authenticatedUser={authenticatedUser} />
      </Header>

      <main className="page-content">
        <Outlet context={movieContext} />
      </main>

      <Footer urlLogo="https://media.istockphoto.com/id/1202770152/fr/photo/bobine-de-film-disolement-sur-le-fond-jaune-lumineux-dans-les-couleurs-pastel.jpg?s=1024x1024&w=is&k=20&c=2yKBrC8oyimPdW-5IxFWN_zxFPVK3KWYL9OE2gVmVX4=" 
      theme={theme}>
        <p>© myMovies</p>
      </Footer>
    </div>
  );
};

export default App;