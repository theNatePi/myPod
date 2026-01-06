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
      <NavButton margin="0 0 125px 0">MENU</NavButton>
      <NavButton margin="0 0 -125px 0">hi</NavButton>
      <NavButton margin="0 0 0 -130px">hi</NavButton>
      <NavButton margin="0 0 0 130px">hi</NavButton>
    </div>
  )
}

export default NavCircle;
