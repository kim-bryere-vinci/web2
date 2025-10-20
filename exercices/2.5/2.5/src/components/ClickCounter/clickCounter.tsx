import { useState } from "react";
import "./clickCounter.css"

interface clickCounterProps{
    titre: string,
    on10ClickMessage?: string
    onMouseOver?:string
}

const HandleClick = ({titre, on10ClickMessage, onMouseOver} : clickCounterProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isHovered, setIsHovered] = useState(false);

    return( 
        <div className="card">
            <h4>{titre}</h4>
            {isHovered ? <p>{onMouseOver}</p> : null}  
            <button onClick={() => setCount((count) + 1)} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                        count is {count}
            </button>
            {count >= 10 ? <p>{on10ClickMessage}</p> : null}
        </div>
    )
}

export default HandleClick;