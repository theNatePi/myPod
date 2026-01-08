function LoadingScreen() {
  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            background: 'conic-gradient(from 180deg at 50% 50%, rgba(27, 144, 203, 0.00) 0deg, #0C4867 360deg)',
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              width: '70%',
              height: '70%',
              background: 'var(--background-color-primary)',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default LoadingScreen;
