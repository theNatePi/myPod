import TimeBar from './timeBar';
import HomeScreen from './homeScreen';
import PodcastScreen from './podcastScreen';
import EpisodeScreen from './episodeScreen';
import AddPodcastScreen from './addPodcastScreen';
import { SCREENS } from '../../utils/navReducer';

function ScreenRenderer({ screen, dispatch, selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode, playbackControls }) {
  switch (screen) {
    case SCREENS.HOME:
      return <HomeScreen setSelectedPodcast={setSelectedPodcast} dispatch={dispatch} />;
    case SCREENS.PODCASTS:
      return <PodcastScreen selectedPodcast={selectedPodcast} setSelectedEpisode={setSelectedEpisode} dispatch={dispatch} />;
    case SCREENS.EPISODE:
      return <EpisodeScreen selectedPodcast={selectedPodcast} selectedEpisode={selectedEpisode} playbackControls={playbackControls} dispatch={dispatch} />;
    case SCREENS.ADD_PODCAST:
      return <AddPodcastScreen dispatch={dispatch} />;
    default:
      return null;
  }
}


function Screen({ screenStack, dispatch, selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode, playbackControls }) {
  const currentScreen = screenStack[screenStack.length - 1];

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
          <ScreenRenderer 
            screen={currentScreen}
            dispatch={dispatch}
            selectedPodcast={selectedPodcast}
            setSelectedPodcast={setSelectedPodcast}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
            playbackControls={playbackControls}
          />
        </div>
      </div>
    </div>
  )
}

export default Screen;
