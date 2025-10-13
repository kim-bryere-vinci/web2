interface FooterProps{
    children: React.ReactNode;
    logo: string
}

const FooterObject = (props: FooterProps) => {
    return(
        <div className="footer-object">
            <div className="footer-contenu">{props.children}</div>
            <img src={props.logo} alt="logo" className="footer-image" width={500}/>
        </div>
    )
}

export default FooterObject;