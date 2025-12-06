import { useState, type SyntheticEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type MovieContext } from "../types";

const RegisterPage = () => {
    const {registerUser}: MovieContext = useOutletContext();

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            await registerUser({username, password});
            navigate("/");
        }catch(err){
            console.error("RegisterPage:error: ", err);
        }
    }

    const handleUsernameChange = (e:SyntheticEvent) => {
        const input = e.target as HTMLInputElement;
        setUsername(input.value);
    }

    const handlePasswordChange = (e: SyntheticEvent) => {
        const input = e.target as HTMLInputElement;
        setPassword(input.value);
    }

    return(
        <div>
            <h1>Ajoutez un utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                value={username}
                name="username"
                id="username"
                onChange={handleUsernameChange}
                required/>

                <label htmlFor="password">Password</label>
                <input type="text" 
                name="password"
                value={password}
                id="password"
                onChange={handlePasswordChange}
                required/>

                <button type="submit"> Créer le compte</button>
            </form>
        </div>
    )
}

export default RegisterPage;