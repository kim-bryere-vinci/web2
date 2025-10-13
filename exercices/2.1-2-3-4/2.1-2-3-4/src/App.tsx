import Cinema from "./components/Cinema";
import PageTitle from "./components/PageTitle";
import type { Movie } from "./components/Movie";

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
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={movieCinema1} />

      <Cinema name={cinema2Name} movies={movieCinema2}/>
    </div>
  );
};

export default App;
