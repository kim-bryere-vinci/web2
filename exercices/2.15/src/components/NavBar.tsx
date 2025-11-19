import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    return(
    <nav className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cinemas")}>Cinema</button>
        <button onClick={() => navigate("/movie-list")}>My favourite movies</button>
        <button onClick={() => navigate("/addMoviePage")}>Add movie</button>
    </nav>
    )
}


export default NavBar;