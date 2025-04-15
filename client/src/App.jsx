import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBox from './Components/Chatbox'
import Dream from './Components/Dream'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ChatBox/> */}
      <Dream/>
    </>
  )
}

export default App
