import { useState } from "react"
import "./ClickColor.css"

const colors = ["pink", "black", "purple", "blue", "green"];

const ColorBox = () => {
    const [currentColor, setCurentColor] = useState(0);

    return(
        <div className="color-box" style={{backgroundColor:colors[currentColor]}}>
            <button onClick={() => setCurentColor((currentColor +1) % colors.length)}>
            {colors[currentColor % colors.length]}
            </button>
        </div>
    )
}

export default ColorBox;