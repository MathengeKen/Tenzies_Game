import React from "react"
import "./styles.css"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

  const [dice, setDiceState] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allHaveSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allHaveSameValue) {
      setTenzies(true)
      console.log("You Won")
    }
  }, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDiceArray =[]
    for (let i =0; i <10; i++){
      newDiceArray.push(generateNewDie())
    }
    //console.log(newDiceArray)
    return newDiceArray;
  }

  /*function rollDice(){
    setDiceState(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie();
    }))
  */

  function rollDice(){
    if(!tenzies){
    setDiceState(oldDice => oldDice.map(die => {
      return die.isHeld ? die:
                          generateNewDie();
    }))}
    else{
      setTenzies(false)
      setDiceState(allNewDice())
    }
  }

  
  /*
  //Replaced this function with the one below 
  function holdDice(id){
    const updatedDiceArray = dice.map((die) => {
      if (die.id === id){
        return {...die, isHeld:!die.isHeld};
      }
      else { return die;
      }
    });
    setDiceState(updatedDiceArray);
  };
  */


  function holdDice(id){
    setDiceState(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : {...die};
    }))
  }
  
  
  const diceElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={()=>holdDice(die.id)}/>)

  return (
      <main>
        { tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
  )
}