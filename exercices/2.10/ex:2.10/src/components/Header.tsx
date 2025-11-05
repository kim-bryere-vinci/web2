interface HeaderProps{
    urlLogo: string;
    children: React.ReactNode;
}

const Header = ({urlLogo, children}: HeaderProps) => {
    return (
        <header className="header">
            <img src={urlLogo} alt="Logo" className="logo" />
            <div>{children}</div>
        </header>
    )
}

export default Header;