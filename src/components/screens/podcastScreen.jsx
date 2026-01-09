import { useState, useEffect } from 'react';
import { ListItem } from './screenComponents';
import LoadingScreen from './loadingScreen';

function PodcastScreen({ setCurrentScreen, selectedPodcast, setSelectedEpisode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedEpisodeIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedEpisodeIndex((prevIndex) => 
          prevIndex < episodes.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === 'Enter') {
        setSelectedEpisode(episodes[selectedEpisodeIndex]);
        setCurrentScreen('episode');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [episodes, selectedEpisodeIndex]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!window.podcasts) {
        console.error('window.podcasts is not available. Make sure you are running in Electron.');
        return;
      }
      
      try {
        // First, get all feeds to find the one matching the URL
        const episodesList = await window.podcasts.listEpisodes(selectedPodcast.feed_url);
        setEpisodes(episodesList);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selectedPodcast?.feed_url) {
      fetchEpisodes();
    }
  }, [selectedPodcast]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <div style={{ width: '100%' }}>
            <p 
              style={{ 
                margin: '5px 0 0 8px', 
                padding: '0', 
                fontFamily: 'var(--secondary-font-family)', 
                fontSize: '15px', 
                fontWeight: '750', 
                color: 'var(--font-color-primary)',
                marginLeft: '10px' 
              }}
            >
              {selectedPodcast.title}
            </p>
            <div 
              style={{ 
                height: '1px', 
                backgroundColor: 'var(--border-color-primary)', 
                width: '100%', 
                marginTop: '4px',
                marginBottom: '0px',
              }}
            />
          </div>
          {episodes.length > 0 && (
            <div style={{ width: '100%' }}>
              {episodes.map((episode, index) => (
                <ListItem key={episode.id} text={episode.title} onClick={() => { setSelectedEpisode(episode); setCurrentScreen('episode'); }} isSelected={index === selectedEpisodeIndex} showBlueAlert={episode.progress === 0} />
              ))}
            </div>
        )}
      </div>
      )}
    </>
  )
}

export default PodcastScreen;
