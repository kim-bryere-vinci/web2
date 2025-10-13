import "./Header.css"

interface HeaderProps {
    children: React.ReactNode;
    logo: string
}

const HeaderObject = (props: HeaderProps) =>{
    return (
        <div className="header-objet">
            <div className="header-box">
                <img src={props.logo} alt="logo" className="header-img" />
            </div>
            <div className="header-contenu">{props.children}</div>
            </div>
            
        
    )
}

export default HeaderObject;