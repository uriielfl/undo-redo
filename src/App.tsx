import { useState } from 'react'
import './App.css'

interface IPositions {
  x: number,
  y: number
}

function App() {
  const [positions, setPositions] = useState<IPositions[]>([]);
  const [oldPositions, setOldPositions] = useState<IPositions[]>([]);

  const handleCursorPosition = (event: MouseEvent) => {
    setPositions([...positions, { x: Number(event.clientX), y: Number(event.clientY)}])
    setOldPositions([]);
  }

  const handleUndo = () => {
    const newPositions = positions.slice(0, -1);
    setOldPositions([...oldPositions, positions[positions.length - 1]])
    setPositions(newPositions)
  }

  const handleRedo = () => {
    setOldPositions([...oldPositions].slice(0, -1))
    setPositions([...positions, oldPositions[oldPositions.length - 1]])
  }

  return (
    <div className="App" onKeyDown={(e) => console.log(e.key)}>
      <div className="container" onClick={(event) => handleCursorPosition(event)}>
        {positions.map((position: IPositions) => (
          <div key={position.x + position.y} style={{ top: position.y, left: position.x}} className="circles">
          </div>
        ))}
      </div>
        <div className="action-buttons">
          <button onClick={handleUndo} disabled={positions.length < 1}>Undo</button>
          <button onClick={handleRedo} disabled={oldPositions.length <= 0}>Redo</button>
        </div>
    </div>
  )
}

export default App
