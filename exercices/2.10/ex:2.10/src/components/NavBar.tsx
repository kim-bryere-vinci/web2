import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return(
    <nav className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cinemas")}>Cinema</button>
        <button onClick={() => navigate("/movie-list")}>My favourite movies</button>
    </nav>
    )
}


export default NavBar;