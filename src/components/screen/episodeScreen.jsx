function EpisodeScreen({ selectedEpisode, playbackControls }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        textAlign: 'center',
      }}
    >
      <img 
        style={{
          width: '120px',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginTop: '-5px',
        }}
        src={selectedEpisode?.image} 
      />

      <audio 
        ref={playbackControls?.audioRef}
        style={{ width: '100%', height: '100%', display: 'none' }} 
        autoPlay
      />
      <p
        style={{
          fontFamily: 'var(--primary-font-family)',
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--font-color-primary)',
          width: '80%',
          lineHeight: '1.2',
          margin: '5px 0 1px 0',
        }}
      >
        {selectedEpisode?.title?.length > 40
          ? `${selectedEpisode.title.substring(0, 40)}...` 
          : selectedEpisode?.title}
      </p>
      <p
        style={{
          fontFamily: 'var(--secondary-font-family)',
          fontSize: '9px',
          fontWeight: '500',
          color: 'var(--font-color-primary)',
          width: '80%',
        }}
      >
        {selectedEpisode?.pubDate?.toLocaleDateString()}
      </p>
      <div
        style={{
          // width: '90%',
          height: '15px',
          margin: '5px 0 1px 0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--primary-font-family)', fontSize: '9px', fontWeight: '500', color: 'var(--font-color-primary)', width: '30px' }}>
          {playbackControls?.formattedCurrentTime || '0:00'}
        </p>
        <div
          style={{ 
            width: '80px', 
            height: '8px', 
            background: 'linear-gradient(180deg, #FFF 0%, #999 100%)',
            margin: '0 5px' 
          }}
        >
          <div 
            style={{ 
              width: `${(playbackControls?.currentTime / playbackControls?.duration) * 100}%`, 
              height: '8px', 
              background: 'linear-gradient(180deg, #1B90CB 0%, #0C4867 100%)',
            }} 
          />
        </div>
        <p style={{ fontFamily: 'var(--primary-font-family)', fontSize: '9px', fontWeight: '500', color: 'var(--font-color-primary)', width: '30px' }}>
          {playbackControls?.formattedDuration || '0:00'}
        </p>
      </div>
    </div>
  )
}

export default EpisodeScreen;
