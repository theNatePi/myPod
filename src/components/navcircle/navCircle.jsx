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
    <div
      style={{
        borderRadius: '50%',
        border: '50px solid #D7D7D7',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NavButton margin="0 0 125px 0"><p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--font-color-primary)' }}>MENU</p></NavButton>
      <NavButton margin="0 0 -125px 0">
        <PlayButton style={{ width: '35px', height: '35px', marginLeft: '-4px', marginTop: '5px' }} />
      </NavButton>
      <NavButton margin="0 0 0 -130px">
        <SkipBackButton style={{ width: '35px', height: '35px', marginLeft: '5px' }} />
      </NavButton>
      <NavButton margin="0 0 0 130px">
        <SkipForwardButton style={{ width: '35px', height: '35px', marginLeft: '-5px' }} />
      </NavButton>
    </div>
  )
}

export default NavCircle;
