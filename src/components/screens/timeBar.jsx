import { useState, useEffect } from 'react';
import BatteryIcon from './../../assets/battery.svg?react';

function TimeBar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: '0',
      padding: '0',
      height: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border-color-primary)',
      background: 'linear-gradient(180deg, var(--background-color-primary) 45%, rgba(113, 113, 113, 0.40) 100%)',
      borderRadius: '4px 4px 0 0',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
      }}>
        <p style={{ fontFamily: 'var(--primary-font-family)', fontSize: '9.6px', fontWeight: '700', color: 'var(--font-color-primary)' }}>{currentTime}</p>
        <BatteryIcon style={{ width: '25px', height: '25px' }} />
      </div>
    </div>
  )
}

export default TimeBar;
