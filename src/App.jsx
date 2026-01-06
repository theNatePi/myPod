import './App.css'
import Body from './components/body'
import NavCircle from './components/navcircle/navCircle'
import Screen from './components/screen/screen'

function App() {
  return (
    <>
      <div>
        <Body>
          <Screen />
          <NavCircle />
        </Body>
      </div>
    </>
  )
}

export default App
