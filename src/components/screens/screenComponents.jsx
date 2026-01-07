function ListItem({text, onClick, isSelected}) {
  return (
    <div    
      style={{
        width: '100%',
        height: isSelected ? 'auto' : '18px',
        background: isSelected ? 'linear-gradient(180deg, #1B90CB 0%,rgb(23, 110, 153) 40%, rgb(23, 110, 153) 60%, #1B90CB 100%)' : 'transparent',
        borderBottom: '1px solid var(--border-color-primary)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
        overflow: isSelected ? 'visible' : 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <p 
        style={{ 
          fontFamily: 'var(--primary-font-family)', 
          fontSize: '12px', 
          fontWeight: '600', 
          color: isSelected ? 'var(--font-color-secondary)' : 'var(--font-color-primary)',
          marginLeft: '10px',
        }}>
          {text}
        </p>
    </div>
  )
}

export { ListItem };
