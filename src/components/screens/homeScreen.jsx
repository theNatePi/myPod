import { useState, useEffect } from 'react';
import { ListContainer, ListItem } from './screenComponents';
import LoadingScreen from './loadingScreen';
import { SCREENS } from '../../utils/navReducer';

function HomeScreen({ setSelectedPodcast, dispatch }) {
  const [isLoading, setIsLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 is always "+ Add Podcast"

  useEffect(() => {
    const fetchFeeds = async () => {
      const feeds = await window.podcasts.listFeeds();
      const enrichedFeeds = feeds.map(feed => ({
        id: feed.feed_url || feed.title,
        text: feed.title,
        onClick: () => {
          setSelectedPodcast(feed);
          dispatch({ type: 'PUSH', screen: SCREENS.PODCASTS });
        }
      }));
      setPodcasts(enrichedFeeds);
      setIsLoading(false);
      if (enrichedFeeds.length > 0) {
        setSelectedIndex(1);
      }
    }
    fetchFeeds();
  }, [dispatch, setSelectedPodcast]);

  const maxIndex = podcasts.length;
  const activeSelectedIndex = Math.min(selectedIndex, maxIndex);

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
            Podcasts
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
          selectedIndex={activeSelectedIndex}
          onSelectionChange={(nextIndex) => {
            setSelectedIndex(Math.max(0, Math.min(nextIndex, maxIndex)));
          }}
          onEnter={(index) => {
            if (index === 0) {
              dispatch({ type: 'PUSH', screen: SCREENS.ADD_PODCAST });
              return;
            }
            podcasts[index - 1]?.onClick?.();
          }}
        >
          <ListItem
            text={"+ Add Podcast"}
            onClick={() => { dispatch({ type: 'PUSH', screen: SCREENS.ADD_PODCAST }); }}
            isSelected={activeSelectedIndex === 0}
          />
          {podcasts.map((item, index) => (
            <ListItem key={item.id} text={item.text} onClick={item.onClick} isSelected={activeSelectedIndex === index + 1} />
          ))}
        </ListContainer>
      </div>
    )}
    </>
  );
}

export default HomeScreen;
