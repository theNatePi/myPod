import TimeBar from './timeBar';

function Screen() {
  return (
    <div
      style={{
        width: '100%',
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
      </div>
    </div>
  )
}

export default Screen;
