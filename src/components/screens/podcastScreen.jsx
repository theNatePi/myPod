import { useState, useEffect } from 'react';
import { ListContainer, ListItem } from './screenComponents';
import LoadingScreen from './loadingScreen';
import { SCREENS } from '../../utils/navReducer';

function PodcastScreen({ selectedPodcast, setSelectedEpisode, dispatch }) {
  const [isLoading, setIsLoading] = useState(true);

  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  const [confirmRemovePodcast, setConfirmRemovePodcast] = useState(false);

  const handleRemovePodcast = async () => {
    if (!confirmRemovePodcast) {
      setConfirmRemovePodcast(true);
      return;
    }

    await window.podcasts.removeFeed(selectedPodcast.feed_url);
    dispatch({ type: 'POP' });
  };

  const maxEpisodeIndex = Math.max(episodes.length - 1, 0);
  const activeSelectedEpisodeIndex = episodes.length === 0
    ? -1
    : Math.min(selectedEpisodeIndex, maxEpisodeIndex);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!window.podcasts) {
        console.error('window.podcasts is not available. Make sure you are running in Electron.');
        return;
      }
      
      try {
        // First, get all feeds to find the one matching the URL
        if (new Date(selectedPodcast.last_fetched) < new Date(Date.now() - 1000 * 60 * 60 * 24)) {
          await window.podcasts.refreshFeed(selectedPodcast.feed_url);
        }

        const episodesList = await window.podcasts.listEpisodes(selectedPodcast.feed_url);
        setEpisodes(episodesList);
        if (episodesList.length > 0) {
          // Skip the "remove podcast" item
          setSelectedEpisodeIndex(1);
        }
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
          <ListContainer
            selectedIndex={activeSelectedEpisodeIndex}
            onSelectionChange={(nextIndex) => {
              setConfirmRemovePodcast(false);
              if (episodes.length === 0) return;
              setSelectedEpisodeIndex(Math.max(0, Math.min(nextIndex, maxEpisodeIndex)));
            }}
            onEnter={(index) => {
              if (index === 0) {
                handleRemovePodcast();
                return;
              }
              const selectedEpisodeItem = episodes[index-1];
              if (!selectedEpisodeItem) return;
              setSelectedEpisode(selectedEpisodeItem);
              dispatch({ type: 'PUSH', screen: SCREENS.EPISODE });
            }}
          >
            <ListItem
              text={confirmRemovePodcast ? "- Confirm?" : "- Remove Podcast"}
              onClick={handleRemovePodcast}
              isSelected={activeSelectedEpisodeIndex === 0}
            />
            {episodes.map((episode, index) => (
              <ListItem
                key={episode.id}
                text={episode.title}
                onClick={() => {
                  setSelectedEpisode(episode);
                  dispatch({ type: 'PUSH', screen: SCREENS.EPISODE });
                }}
                isSelected={index === activeSelectedEpisodeIndex - 1}
                showAlert={episode.progress === 0}
              />
            ))}
          </ListContainer>
      </div>
      )}
    </>
  )
}

export default PodcastScreen;
