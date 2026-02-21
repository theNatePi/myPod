import { Children, useEffect, useRef } from 'react';
import BlueAlertIcon from './../../assets/blue-alert.svg?react';
import GreyAlertIcon from './../../assets/grey-alert.svg?react';

function ListContainer({ children, selectedIndex, onSelectionChange, onEnter, style = {} }) {
  const containerRef = useRef(null);
  const items = Children.toArray(children);
  const itemCount = items.length;

  useEffect(() => {
    if (!onSelectionChange || itemCount === 0) return;
    if (selectedIndex < 0) {
      onSelectionChange(0);
      return;
    }
    if (selectedIndex > itemCount - 1) {
      onSelectionChange(itemCount - 1);
    }
  }, [itemCount, onSelectionChange, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (itemCount === 0 || !onSelectionChange) return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onSelectionChange(Math.max(0, selectedIndex - 1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        onSelectionChange(Math.min(itemCount - 1, selectedIndex + 1));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onEnter?.(selectedIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [itemCount, onEnter, onSelectionChange, selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedIndex < 0) return;

    const selectedItem = container.querySelector(`[data-list-index="${selectedIndex}"]`);
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, itemCount]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        ...style,
      }}
    >
      {items.map((child, index) => (
        <div key={index} data-list-index={index}>
          {child}
        </div>
      ))}
    </div>
  );
}

function ListItem({text, onClick, isSelected, showAlert = false}) {
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
        {showAlert && (
          isSelected ? (
            <GreyAlertIcon style={{ width: '10px', height: '10px' }} />
          ) : (
            <BlueAlertIcon style={{ width: '10px', height: '10px' }} />
          )
        )}
      </div>
    </div>
  );
}

export { ListContainer, ListItem };
