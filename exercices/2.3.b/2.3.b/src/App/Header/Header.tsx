interface HeadeTitreProps {
    title: string;
}

const Header = (props: HeadeTitreProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Header;

