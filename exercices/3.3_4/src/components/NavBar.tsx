import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import type { MaybeAuthenticated } from "./types";

interface NavBarProps {
    authenticatedUser : MaybeAuthenticated;
    clearUser: () => void;
}

const NavBar = ({authenticatedUser, clearUser}: NavBarProps) => {

    const navigate = useNavigate();
    if(authenticatedUser){
        return(
            <nav>
                <button onClick={() => navigate("/movie-list")}>My favourite movies</button>
                <button onClick={() => navigate("/addMoviePage")}>Add movie</button>
                <button onClick={() => clearUser()}>Log out</button>
            </nav>
            
        )
    }
    return(
    <nav className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cinemas")}>Cinema</button>
        <button onClick={() => navigate("/register")}>Sign up</button>
        <button onClick={() => navigate("/login")}>Login</button>
    </nav>
    )
}


export default NavBar;