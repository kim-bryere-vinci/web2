import "./Footer.css";

interface FooterProps{
    urlLogo: string,
    children: React.ReactNode;
}

const Footer = ({urlLogo, children}: FooterProps) => {
    return (
        <footer className="footer">
            <img src={urlLogo} alt="Logo" className="logo" />
            <div>{children}</div>
        </footer>
    )
}

export default Footer;