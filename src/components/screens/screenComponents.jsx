import BlueAlertIcon from './../../assets/blue-alert.svg?react';
import GreenAlertIcon from './../../assets/green-alert.svg?react';

function ListItem({text, onClick, isSelected, showBlueAlert = false}) {
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
        justifyContent: 'space-between',
        overflow: isSelected ? 'visible' : 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <p 
        style={{ 
          maxWidth: '80%',
          fontFamily: 'var(--primary-font-family)', 
          fontSize: '12px', 
          fontWeight: '600', 
          color: isSelected ? 'var(--font-color-secondary)' : 'var(--font-color-primary)',
          marginLeft: '10px',
        }}
      >
        {text}
      </p>
      <div
        style={{
          width: '15px',
          alignSelf: 'stretch',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <BlueAlertIcon style={{ width: '10px', height: '10px' }} /> */}
        {showBlueAlert && <BlueAlertIcon style={{ width: '10px', height: '10px' }} />}
      </div>
    </div>
  )
}

export { ListItem };
