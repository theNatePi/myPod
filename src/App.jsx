import { useState, useEffect } from 'react';

import './App.css'
import Body from './components/body'
import NavCircle from './components/navcircle/navCircle'
import Screen from './components/screens/screen'
import { usePlaybackControls } from './hooks/usePlaybackControls'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const playbackControls = usePlaybackControls();

  // Load episode when selectedEpisode changes
  useEffect(() => {
    if (selectedEpisode && playbackControls?.loadEpisode) {
      playbackControls.loadEpisode(selectedEpisode);
    }
  }, [selectedEpisode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <Body>
          <Screen 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
            selectedPodcast={selectedPodcast} 
            setSelectedPodcast={setSelectedPodcast} 
            selectedEpisode={selectedEpisode} 
            setSelectedEpisode={setSelectedEpisode}
            playbackControls={playbackControls}
          />
          <NavCircle 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen}
            playbackControls={playbackControls}
          />
        </Body>
      </div>
    </>
  )
}

export default App
