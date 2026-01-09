import { useState, useEffect, useRef, useCallback } from 'react';
import ScubberIcon from './../../assets/scrub-icon.svg?react';

function PlayerBar({ playbackControls }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercentage, setDragPercentage] = useState(null);
  const progressBarRef = useRef(null);
  
  const isLoading = (playbackControls?.formattedCurrentTime || '0:00') === '0:00' && 
                    (playbackControls?.formattedDuration || '0:00') === '0:00';

  const handleSeek = useCallback((clientX) => {
    if (!progressBarRef.current || !playbackControls?.seek || !playbackControls?.duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * playbackControls.duration;
    
    // Update visual position immediately
    setDragPercentage(percentage);
    
    // Update audio position
    playbackControls.seek(newTime);
  }, [playbackControls]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => {
        handleSeek(e.clientX);
      };
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        setDragPercentage(null);
      };
      
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleSeek]);

  // Calculate the current progress percentage
  const progressPercentage = dragPercentage !== null 
    ? dragPercentage * 100 
    : playbackControls?.duration 
      ? (playbackControls.currentTime / playbackControls.duration) * 100 
      : 0;

  return (
    <>
      <style jsx>{`
        @keyframes loadingGlide {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -400% 0;
          }
        }
      `}</style>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          ref={progressBarRef}
          onMouseDown={handleMouseDown}
          style={{ 
            width: '80px', 
            height: '8px', 
            background: 'linear-gradient(180deg, #FFF 0%, #999 100%)',
            margin: '0 5px',
            position: 'relative',
            overflow: 'visible',
            cursor: 'pointer',
          }}
        >
          {isLoading ? (
            <div 
              style={{ 
                width: '100%',
                height: '8px', 
                background: 'linear-gradient(90deg,  transparent 0%, #1B90CB 50%, #0C4867 100%)',
                backgroundSize: '200% 100%',
                animation: 'loadingGlide 2s ease-in-out infinite',
              }} 
            />
          ) : (
            <>
            <div 
              style={{ 
                width: `${progressPercentage}%`, 
                height: '8px', 
                background: 'linear-gradient(180deg, #1B90CB 0%, #0C4867 100%)',
                padding: '0'
              }}
            >
              
            </div>
            {isHovered && 
              <div 
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e);
                }}
                style={{ 
                  position: 'absolute', 
                  left: `${progressPercentage}%`,
                  transform: 'translateX(-50%)',
                  top: '50%',
                  marginTop: '-10px',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}>
                <ScubberIcon style={{ 
                  width: '15px', 
                  height: '15px', 
                  pointerEvents: 'none',
                }} />
              </div>
            }
            </>
          )}
        </div>
        <p style={{ fontFamily: 'var(--primary-font-family)', fontSize: '9px', fontWeight: '500', color: 'var(--font-color-primary)', width: '30px' }}>
          {playbackControls?.formattedDuration || '0:00'}
        </p>
      </div>
    </>
  )
}

function EpisodeScreen({ selectedPodcast, selectedEpisode, playbackControls }) {
  // Use a ref to always capture the latest currentTime without causing re-renders
  const currentTimeRef = useRef(0);
  const hasSetInitialTimeRef = useRef(false);
  
  // Update the ref whenever currentTime changes (doesn't trigger effect re-run)
  useEffect(() => {
    if (playbackControls?.currentTime !== undefined) {
      currentTimeRef.current = playbackControls.currentTime;
    }
  }, [playbackControls?.currentTime]);

  // Reset the flag when episode changes
  useEffect(() => {
    hasSetInitialTimeRef.current = false;
  }, [selectedEpisode?.id]);

  // Save progress when component unmounts (user leaves the screen)
  useEffect(() => {
    return () => {
      // Cleanup function runs ONLY when component unmounts
      if (selectedEpisode?.id && currentTimeRef.current !== undefined && window.podcasts?.updateEpisodeProgress) {
        const progress = Math.floor(currentTimeRef.current);
        window.podcasts.updateEpisodeProgress(selectedEpisode.id, progress).catch((error) => {
          console.error('Failed to save episode progress:', error);
        });
      }
    };
  }, [selectedEpisode?.id]); // Only re-run if episode changes, cleanup runs on unmount

  // Set audio currentTime when audio is ready and playbackControls.currentTime is available
  useEffect(() => {
    const audioRef = playbackControls?.audioRef;
    const startTime = playbackControls?.currentTime;
    if (!audioRef?.current || startTime === undefined || hasSetInitialTimeRef.current) return;

    const audioElement = audioRef.current;
    const handleCanPlay = () => {
      if (startTime > 0 && !hasSetInitialTimeRef.current) {
        audioElement.currentTime = startTime;
        hasSetInitialTimeRef.current = true;
      }
    };

    // If audio is already ready, set it immediately
    if (audioElement.readyState >= 2) { // HAVE_CURRENT_DATA or higher
      handleCanPlay();
    } else {
      audioElement.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      audioElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [playbackControls?.audioRef, playbackControls?.currentTime, selectedEpisode?.id]);

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
          marginTop: '8px',
        }}
        src={selectedPodcast?.image} 
      />

      <audio 
        ref={playbackControls?.audioRef}
        style={{ width: '100%', height: '100%', display: 'none' }} 
      />
      <div
        style={{
          width: '100%',
          height: '32%',
          // background: 'red',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--primary-font-family)',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--font-color-primary)',
              width: '80%',
              lineHeight: '1.2',
              margin: '10px 0 1px 0',
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
            {new Date(selectedEpisode?.pub_date).toLocaleDateString()}
          </p>
        </div>
        <PlayerBar playbackControls={playbackControls} />
      </div>
    </div>
  )
}

export default EpisodeScreen;
