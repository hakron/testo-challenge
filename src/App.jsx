import React, { useState } from 'react'
import SelectInput from './components/SelectInput'
import './app.css'

const XYOptions = [
  {
    key: 0,
    value: 0
  },
  {
    key: 20,
    value: 1
  },
  {
    key: 40,
    value: 2
  },
  {
    key: 60,
    value: 3
  },
  {
    key: 80,
    value: 4
  },
]
const facingOptions = [{
  key: "NORTH",
  value: "North"
},
{
  key: "SOUTH",
  value: "South"
}, {
  key: "WEST",
  value: "West"
},
{
  key: "EAST",
  value: "East"
}]


function App() {
  //Robot with an initial state
  const [robot, setRobot] = useState({
    x: 0,
    y: 0,
    facing: "NORTH"
  })
  //report state to show the movement of the robot
  const [report, setReport] = useState(false)

  //state to check if the robot is out of the board
  const [isOutBoard, setIsOutBoard] = useState(false)

  //destructuring the state
  const { x, y, facing } = robot

  //fn to manage the onChange in the inputs
  // spread the state and replace it with the keys that have been changed
  const handleChange = (event) => {
    const value = event.target.value
    setRobot(
      {
        ...robot,
        [event.target.name]: value
      });
  }

  //place the robot on the board
  const placeRobot = () => setReport(true)

  //fn  to manage the change state when moving the robot, passing two params
  // the key and the new value, (reduce duplication)
  const updateRobotMovement = (key, newMove) => setRobot(
    {
      ...robot,
      [key]: newMove
    });

  //fn to move the robot left,
  // first check that the robot is on the board
  //and then is checking in which direction is facing
  const turnLeft = () => {
    setIsOutBoard(false)
    if (report) {
      switch (facing) {
        case "NORTH":
          updateRobotMovement("facing", "WEST")
          break;
        case "WEST":
          updateRobotMovement("facing", "SOUTH")
          break;
        case "SOUTH":
          updateRobotMovement("facing", "EAST")
          break;
        case "EAST":
          updateRobotMovement("facing", "NORTH")
          break;
        default:
          alert("I don't know what to do");
      }
    }
    console.log("Robot is not on the board");
  }

  //fn to move the robot right,
  // first check that the robot is on the board
  //and then is checking in which direction is facing
  const turnRight = () => {
    setIsOutBoard(false)
    if (report) {
      switch (facing) {
        case "NORTH":
          updateRobotMovement("facing", "EAST")
          break;
        case "WEST":
          updateRobotMovement("facing", "NORTH")
          break;
        case "SOUTH":
          updateRobotMovement("facing", "WEST")
          break;
        case "EAST":
          updateRobotMovement("facing", "SOUTH")
          break;
        default:
          alert("I don't know what to do");
      }
      console.log("Robot is not on the board");
    }
  }

  //fn to move the robot,
  // first check that the robot is on the board
  //and then is checking in which direction is facing
  // depending on in which direction is facing we add or subtract 20
  //if we can not move the robot with set the state of isOutBoard to true
  const move = () => {
    if (report) {
      switch (facing) {
        case "NORTH":
          if (y > 0) {
            updateRobotMovement("y", y - 20)
          } else {
            setIsOutBoard(true)
          }
          break;
        case "WEST":
          if (x > 0) {
            updateRobotMovement("x", x - 20)
          } else {
            setIsOutBoard(true)
          }
          break;
        case "SOUTH":
          if (y < 80) {
            updateRobotMovement("y", y + 20)
          } else {
            setIsOutBoard(true)
          }
          break;
        case "EAST":
          if (x < 80) {
            updateRobotMovement("x", x + 20)
          } else {
            setIsOutBoard(true)
          }
          break;
        default:
          console.log("Robot is not on the board");
      }
    }
  }

  //check if isOutBoard is true, then the value of the const is out__of__board otherwise null
  const isOutOfBoardClass = isOutBoard ? 'out__of__board' : null

  return (
    <div className="App">
      <div className="controls" >
        <div className="input__container">
          {/* custom component  to be reusable, passing props*/}
          <SelectInput label="X" id="x" value={x} handleChange={handleChange} options={XYOptions} />
          <SelectInput label="Y" id="y" value={y} handleChange={handleChange} options={XYOptions} />
          <SelectInput label="Direction" id="facing" value={facing} handleChange={handleChange} options={facingOptions} />
        </div>
        <div className="placement__button__container">
          <button onClick={() => placeRobot(x, y, facing)}>Place the robot</button>
          <button onClick={() => setReport(false)}>Remove robot from board</button>
        </div>
      </div>
      <div className="container">
        <div className="board">
          {report && <div id="robot" className={`${facing.toLowerCase()} ${isOutOfBoardClass}`} style={{
            display: "block",
            left: `${x}%`,
            top: `${y}%`
          }}></div>}
        </div>
      </div>
      <div className="console">
        {report && <div id="report__log">
          <p>{`Move: ${x}, ${y}, ${facing}`}</p>
        </div>}
        <div className="button__container">
          <button className="button" onClick={() => turnLeft()}>
            ↰
          </button>
          <button className="button" onClick={() => move()}> ↥</button>
          <button className="button" onClick={() => turnRight()}>
            ↱
          </button>
        </div>
      </div>
    </div >
  )
}



export default App




