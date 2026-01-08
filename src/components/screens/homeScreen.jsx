import { useState, useEffect, useMemo } from 'react';
import { ListItem } from './screenComponents';

function HomeScreen({ podcasts }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prevIndex) => 
          prevIndex < podcasts.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === 'Enter') {
        podcasts[selectedIndex].onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [podcasts, selectedIndex]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <div style={{ width: '100%' }}>
        <p 
          style={{ 
            margin: '5px 0 0 8px', 
            padding: '0', 
            fontFamily: 'var(--secondary-font-family)', 
            fontSize: '15px', 
            fontWeight: '750', 
            color: 'var(--font-color-primary)',
            marginLeft: '10px' 
          }}
        >
          Podcasts
        </p>
        <div 
          style={{ 
            height: '1px', 
            backgroundColor: 'var(--border-color-primary)', 
            width: '100%', 
            marginTop: '4px',
            marginBottom: '0px',
          }} 
        />
      </div>
      {podcasts.map((item, index) => (
        <ListItem key={item.text} text={item.text} onClick={item.onClick} isSelected={selectedIndex === index} />
      ))}
    </div>
  );
}

export default HomeScreen;
