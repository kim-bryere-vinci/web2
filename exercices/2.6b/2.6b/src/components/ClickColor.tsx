import { useState } from "react"
import "./ClickColor.css"

const colors = ["red", "green", "blue", "yellow", "purple"]

const ColorBox = () => {
    const [cuurentColor, setCurrentColor] = useState(0)
    return(
        <div className="color-box"
        style={{backgroundColor: colors[cuurentColor]}}>
            <button className="color-box-buttom" onClick={() => setCurrentColor((cuurentColor+1)%colors.length)}>
                {colors[(cuurentColor+1) % colors.length]}
            </button>
            <h3>{colors[cuurentColor]}</h3>
        </div>
    )
}

export default ColorBox;