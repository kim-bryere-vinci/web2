import Cinema from "./components/Cinema";
import PageTitle from "./components/PageTitle";
import type { Movie } from "./components/Movie";
import HeaderObject from "./components/Header";
import FooterObject from "./components/Footer";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const movieCinema1 : Movie[] = [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
    }
  ]

  const cinema2Name = "UGC Toison d'Or";

  const movieCinema2: Movie[] = [
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
    },
  ]
  return (
    <div>
      <HeaderObject logo="https://images.unsplash.com/photo-1759800805660-8bc4595568ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070">
      <h1>Tous sur les films</h1></HeaderObject>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={movieCinema1} />

      <Cinema name={cinema2Name} movies={movieCinema2}/>
      <FooterObject logo="https://images.unsplash.com/photo-1760336472685-4c3f0dd8d204?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070">
      <p>© 2021 UGC Cinéma</p></FooterObject>
    </div>
  );
};

export default App;
