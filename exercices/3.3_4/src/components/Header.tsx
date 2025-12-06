import "./Header.css";

interface HeaderProps{
    urlLogo: string;
    children: React.ReactNode;
    theme: "light" | "dark";
    handleThemeChange: () => void;
}

const Header = ({urlLogo, children, theme, handleThemeChange}: HeaderProps) => {
    return (
        <header className="header" style={{
            backgroundColor: theme === "dark" ? "#DB85A8" : "#f9d8ec",
            color: theme === "dark" ? "white" : "#5e4b56",
        }}>
            <img src={urlLogo} alt="Logo" className="logo" />
            <button onClick={handleThemeChange} 
            style={{backgroundColor: theme === "dark" ? "#DB85A8" : "#f9d8ec"}}>
                {theme === "light" ? "🌙" : "🌞"}
            </button>
            <div>{children}</div>
        </header>
    )
}

export default Header;