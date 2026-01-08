import TimeBar from './timeBar';
import HomeScreen from './homeScreen';
import PodcastScreen from './podcastScreen';
import EpisodeScreen from './episodeScreen';
import { useMemo } from 'react';

function Screen({ currentScreen, setCurrentScreen, selectedPodcast, setSelectedPodcast, rssUrls, selectedEpisode, setSelectedEpisode, playbackControls }) {
  const listItems = useMemo(() => [
    { text: '+ Add Podcast', onClick: () => {} },
    { text: 'The Yard', onClick: () => { setCurrentScreen('podcast'); setSelectedPodcast('The Yard'); } },
    { text: 'WAN Show', onClick: () => { setCurrentScreen('podcast'); setSelectedPodcast('WAN Show'); } },
    { text: 'Waveform', onClick: () => { setCurrentScreen('podcast'); setSelectedPodcast('Waveform'); } }
  ], [setCurrentScreen, setSelectedPodcast]);
  
  return (
    <div
      style={{
        width: '168px',
        height: '250px',
        padding: '6px',
        background: 'linear-gradient(270deg, #6F6F6F 0%, #B6B6B6 27.88%, #B6B6B6 71.15%, #6F6F6F 100%)',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 20px 12px rgba(0, 0, 0, 0.25) inset',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          background: 'var(--background-color-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0',
          padding: '0',
          boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.25) inset',
        }}
      >
        <TimeBar />
        <div style={{ overflowY: currentScreen === 'episode' ? 'hidden' : 'auto', scrollbarWidth: 'none', width: '100%', height: '100%' }}>
          {currentScreen === 'home' && <HomeScreen podcasts={listItems} />}
          {currentScreen === 'podcast' && <PodcastScreen setCurrentScreen={setCurrentScreen} selectedPodcast={selectedPodcast} rssUrls={rssUrls} setSelectedEpisode={setSelectedEpisode} />}
          {currentScreen === 'episode' && <EpisodeScreen selectedEpisode={selectedEpisode} playbackControls={playbackControls} />}
        </div>
      </div>
    </div>
  )
}

export default Screen;
