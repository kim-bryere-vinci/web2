import type { User } from '../Type/User';
import './index.css'

interface UsersProps{
    user: User
}

const UserProps = (props: UsersProps) => {
    return (
        <div className={`User-object ${props.user.isOnline ? "online" : "offline"}`}>
            <div className="User-content">
                <strong className="User-nom">{props.user.nom}</strong>
                <p className="User-age">{props.user.age}</p>
                <div className={props.user.isOnline ? "status-online" : "status-offline"}>
                    {props.user.isOnline ? "En ligne" : "Hors ligne"}
                </div>
            </div>
        </div>
    )
}

export default UserProps;