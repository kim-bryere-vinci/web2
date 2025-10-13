import type { User } from "../Type";

interface UserProps{
    user: User;
}

const MenuUser = (props: UserProps) => {
    return (
        <div>
                <div key={props.user.name}>
                    <h2>{props.user.name}</h2>
                    <p>Age: {props.user.age}</p>
                </div>
        </div>
        )
}

export default MenuUser;