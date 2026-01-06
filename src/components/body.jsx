import Titlebar from './titlebar';

function Body({ children }) {
  // SVG noise pattern for grain texture
  const grainPattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
  
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.00) 27.88%, rgba(0, 0, 0, 0.00) 71.15%, rgba(0, 0, 0, 0.30) 100%), linear-gradient(180deg, #325BA1 0%, #194082 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Titlebar />
      <div style={{ zIndex: 1 }}>
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: grainPattern,
          backgroundSize: '200px 200px',
          opacity: 0.6,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Body;
