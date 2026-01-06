import SkipBackButton from './../../assets/skip-back-button.svg?react';
import SkipForwardButton from './../../assets/skip-forward-button.svg?react';
import PlayButton from './../../assets/play-pause-button.svg?react';

function NavButton({ children, margin }) {
  return (
    <button style={{
      borderRadius: '50%',
      width: '70px',
      height: '70px',
      padding: '0',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      position: 'absolute',
      margin: margin,
    }}>
      {children}
    </button>
  )
}

function NavCircle() {
  return (
    <div style={{
      borderRadius: '50%',
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,rgba(255, 255, 255, 0.4) 0%,rgba(255, 255, 255, 0.4) 25%,rgba(11, 29, 61, 0.2) 75%,rgba(11, 29, 61, 0.) 100%)',
      maskImage: 'radial-gradient(circle, transparent 38px, black 38px)',
      WebkitMaskImage: 'radial-gradient(circle, transparent 38px, black 38px)',
    }}>
      <div
        style={{
          borderRadius: '50%',
          border: '40px solid var(--background-color-primary)',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <NavButton margin="0 0 115px 0"><p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--font-color-primary)' }}>MENU</p></NavButton>
        <NavButton margin="0 0 -115px 0">
          <PlayButton style={{ width: '30px', height: '30px', marginLeft: '-4px', marginTop: '5px' }} />
        </NavButton>
        <NavButton margin="0 0 0 -120px">
          <SkipBackButton style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
        </NavButton>
        <NavButton margin="0 0 0 120px">
          <SkipForwardButton style={{ width: '30px', height: '30px', marginLeft: '-4px' }} />
        </NavButton>
      </div>
    </div>
  )
}

export default NavCircle;
