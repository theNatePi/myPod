import { useState, useEffect } from 'react';

import './App.css'
import Body from './components/body'
import NavCircle from './components/navcircle/navCircle'
import Screen from './components/screens/screen'
import { usePlaybackControls } from './utils/usePlaybackControls'
import { navReducer, SCREENS } from './utils/navReducer';
import { useReducer } from 'react';

function App() {
  const [screenStack, dispatch] = useReducer(navReducer, [SCREENS.HOME]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const playbackControls = usePlaybackControls();

  // Load episode when selectedEpisode changes
  useEffect(() => {
    if (selectedEpisode && playbackControls?.loadEpisode) {
      playbackControls.loadEpisode(selectedEpisode);
    }
  }, [selectedEpisode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dispatch({ type: 'POP' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <>
      <div>
        <Body>
          <Screen
            screenStack={screenStack}
            dispatch={dispatch}
            selectedPodcast={selectedPodcast} 
            setSelectedPodcast={setSelectedPodcast} 
            selectedEpisode={selectedEpisode} 
            setSelectedEpisode={setSelectedEpisode}
            playbackControls={playbackControls}
          />
          <NavCircle
            dispatch={dispatch}
            playbackControls={playbackControls}
          />
        </Body>
      </div>
    </>
  )
}

export default App
