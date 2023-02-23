import React from "react"
import "../styles.css"


export default function Die(props){
    return (
        <div  className="die-face" 
              style={{backgroundColor: props.isHeld ? "#59E391" : "#F0F0F0"}}
              onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}