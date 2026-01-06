function Titlebar() {
  return (
    <>
      <div 
        style={{
          width: '100%',
          height: '20px',
          '-webkit-app-region': 'drag',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      />
    </>
  )
}

export default Titlebar;
