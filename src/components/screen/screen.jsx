function Screen({ children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '180px',
        padding: '6px',
        background: 'linear-gradient(270deg, #6F6F6F 0%, #B6B6B6 27.88%, #B6B6B6 71.15%, #6F6F6F 100%)',
        marginBottom: '20px',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          background: 'var(--background-color-primary)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Screen;
