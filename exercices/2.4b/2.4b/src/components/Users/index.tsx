import './index.css'

interface UsersProps{
    nom: string,
    age: number,
    isOnline: boolean
}

const User = (props: UsersProps) => {
    return (
        <div className={`User-object ${props.isOnline ? "online" : "offline"}`}>
            <div className="User-content">
                <strong className="User-nom">{props.nom}</strong>
                <p className="User-age">{props.age}</p>
                <div className={props.isOnline ? "status-online" : "status-offline"}>
                    {props.isOnline ? "En ligne" : "Hors ligne"}
                </div>
            </div>
        </div>
    )
}

export default User;