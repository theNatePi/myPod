import { useState } from 'react';

import './App.css'
import Body from './components/body'
import NavCircle from './components/navcircle/navCircle'
import Screen from './components/screen/screen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const rssUrls = {
    'The Yard': 'https://feeds.megaphone.fm/theyard',
  }

  return (
    <>
      <div>
        <Body>
          <Screen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} selectedPodcast={selectedPodcast} setSelectedPodcast={setSelectedPodcast} rssUrls={rssUrls} />
          <NavCircle setCurrentScreen={setCurrentScreen} />
        </Body>
      </div>
    </>
  )
}

export default App
