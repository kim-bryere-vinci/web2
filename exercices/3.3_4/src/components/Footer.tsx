import "./Footer.css";

interface FooterProps{
    urlLogo: string,
    children: React.ReactNode;
    theme: "light" | "dark";
}
const Footer = ({urlLogo, children, theme, }: FooterProps) => {
    console.log("footer", theme);
    return (
        <footer className="footer" style={{
            backgroundColor: theme === "dark" ? "#DB85A8" : "#f9d8ec",
            color: theme === "dark" ? "white" : "#5e4b56",
        }}>

            <img src={urlLogo} alt="Logo" className="logo" />
            <div>{children}</div>
        </footer>
    )
}

export default Footer;