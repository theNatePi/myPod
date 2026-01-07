import { useState, useEffect } from 'react';

import './App.css'
import Body from './components/body'
import NavCircle from './components/navcircle/navCircle'
import Screen from './components/screen/screen'
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

  const rssUrls = {
    'The Yard': 'https://feeds.megaphone.fm/theyard',
    'Waveform': 'https://feeds.megaphone.fm/STU4418364045',
    'WAN Show': 'https://feeds.megaphone.fm/LMG3928170156'
  }

  return (
    <>
      <div>
        <Body>
          <Screen 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
            selectedPodcast={selectedPodcast} 
            setSelectedPodcast={setSelectedPodcast} 
            rssUrls={rssUrls} 
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
