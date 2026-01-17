import { useState } from 'react';

function AddPodcastScreen({ dispatch }) {
  const [feedUrl, setFeedUrl] = useState('');

  const handleAddPodcast = async () => {
    if (!feedUrl.trim()) return;
    try {
      await window.podcasts?.addFeed(feedUrl.trim());
      dispatch({ type: 'POP' });
      setFeedUrl('');
    } catch (error) {
      console.error('Failed to add podcast:', error);
    }
  };

  return (
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
          Add Podcast
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
        <p
          style={{
            margin: '10px 10px 0 10px',
            padding: '0',
            fontFamily: 'var(--secondary-font-family)',
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--font-color-primary)',
          }}
        >
          <b>First,</b> find the RSS feed URL for your podcast.<br /><b>Then,</b> paste it here:
        </p>
        <input
          type="text"
          placeholder=""
          value={feedUrl}
          onChange={(e) => setFeedUrl(e.target.value)}
          style={{
            margin: '10px 10px 0 10px',
            padding: '8px',
            width: 'calc(100% - 38px)',
            backgroundColor: 'var(--background-color-primary)',
            border: '1px solid var(--border-color-primary)',
            outline: 'none',
            userSelect: 'text',
            borderRadius: '10px',
            fontFamily: 'var(--secondary-font-family)',
            fontSize: '12px',
            color: 'var(--font-color-primary)',
            textAlign: 'left',
          }}
        />
        <button
          style={{
            margin: '10px 10px 0 10px',
            padding: '10px',
            width: 'calc(100% - 20px)',
            borderRadius: '10px',
            outline: 'none',
            fontFamily: 'var(--secondary-font-family)',
            fontSize: '12px',
            color: 'white',
            background: 'linear-gradient(180deg, #1B90CB 0%, #0C4867 40%, #0C4867 60%, #1B90CB 100%)',
          }}
          onClick={handleAddPodcast}
          disabled={!feedUrl.trim()}
        >
          Add Podcast
        </button>
      </div>
    </div>
  );
}

export default AddPodcastScreen;
