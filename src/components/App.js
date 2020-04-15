import React, { useState, useRef } from 'react'

let si

const App = () => {

  const [splitText, setSplitText] = useState([])
  const [text, setText] = useState('')
  const [speed, setSpeed] = useState(500)
  const [isPlaying, setIsPlaying] = useState(false)
  const textElement = useRef(null)

  const handleTextChange = e => {
    setText(e.target.value)
    setSplitText(e.target.value.split(' '))
  }

  const handleSpeed = e => {
    setSpeed(e.target.value)
  }

  const stop = e => {
    e.preventDefault()
    textElement.current.textContent = ''
    setIsPlaying(false)
    clearInterval(si)
  }

  const onSumbit = e => {
    e.preventDefault()
    setIsPlaying(true)
    let counter = 0;
    let limit = splitText.length
    textElement.current.textContent = ''

    si = setInterval(() => {
      if (counter === limit) {
        setIsPlaying(false)
        counter = 0;
        clearInterval(si)
      } else {
        textElement.current.textContent = splitText[counter]
        counter++;
      }
    }, speed)
  }

  return (
    <div className="main">
      <h1>Speed Reader</h1>

      <p><span ref={textElement}></span></p>
      
      <span>Speed: {((1000 / speed) * 60).toFixed(0)}wpm</span>
      <form>
        {
          !isPlaying && (
            <input 
              type="range" 
              min={100} 
              max={1000}
              step={100}
              value={speed}
              onChange={handleSpeed}/>
          )
        }
        <textarea 
          placeholder="Please Enter text in textbox" 
          value={text}
          onChange={handleTextChange}
          style={{
            display: isPlaying ? 'none' : 'block'
          }}/>
        {
          !isPlaying ? (
            <button
              disabled={text.length === 0 } 
              onClick={onSumbit}>Play</button>
            ) : (
            <button onClick={stop}>Stop</button>
            )
        }
      </form>
    </div>
  )
}

export default App