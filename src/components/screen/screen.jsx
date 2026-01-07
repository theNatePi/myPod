import TimeBar from './timeBar';
import HomeScreen from './homeScreen';
import PodcastScreen from './podcastScreen';

function Screen({ currentScreen, setCurrentScreen, selectedPodcast, setSelectedPodcast, rssUrls }) {
  return (
    <div
      style={{
        width: '168px',
        height: '215px',
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
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', width: '100%', height: '100%' }}>
          {currentScreen === 'home' && <HomeScreen setCurrentScreen={setCurrentScreen} setSelectedPodcast={setSelectedPodcast} />}
          {currentScreen === 'podcast' && <PodcastScreen selectedPodcast={selectedPodcast} rssUrls={rssUrls} />}
        </div>
        {/* <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F96%2F3f%2Fff%2F963fff47877da340e2cc13419edba4bb.jpg&f=1&nofb=1&ipt=e67bb27c4b2c1f49a7c2a467156f75df1b67dc97e80517e4aec59c7d184b32ed"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '4px',
        }}
        />
        <div
          style={{
            width: '80px',
            height: '80px',
            // position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            transform: 'perspective(10px) rotateX(10deg) scaleY(-1) translateY(10px) scale(2)',
            // transformOrigin: 'top',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F96%2F3f%2Fff%2F963fff47877da340e2cc13419edba4bb.jpg&f=1&nofb=1&ipt=e67bb27c4b2c1f49a7c2a467156f75df1b67dc97e80517e4aec59c7d184b32ed"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        </div> */}
      </div>
    </div>
  )
}

export default Screen;
