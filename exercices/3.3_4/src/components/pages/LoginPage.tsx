import { useState, type SyntheticEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type MovieContext } from "../types";

const LoginPage = () => {
    const {loginUser} : MovieContext = useOutletContext();

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            await loginUser({username, password});
            navigate("/");
        }catch(err){
            console.error("LoginPage::error", err);
        }
    }

    const handleUsernameInputChange = (e:SyntheticEvent) => {
        const input = e.target as HTMLInputElement;
        setUsername(input.value);
    }

    const handlePasswordInputChange = (e: SyntheticEvent) => {
        const input = e.target as HTMLInputElement;
        setPassword(input.value);
    }

    return (
        <div>
            <h1>Connectez un utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                value={username}
                id="username"
                name="username"
                onChange={handleUsernameInputChange}
                required
                />
                 <label htmlFor="password">Password</label>
                <input type="text" 
                value={password}
                id="password"
                name="password"
                onChange={handlePasswordInputChange}
                required
                />

                <button type="submit">S'authentifier</button>
            </form>
        </div>
    )
}

export default LoginPage;