const { Menu, MenuItem, BrowserWindow } = require('electron');

function setupKeybinds() {
  const menu = new Menu();

  // The first submenu needs to be the app menu on macOS
  if (process.platform === 'darwin') {
    const appMenu = new MenuItem({ role: 'appMenu' });
    menu.append(appMenu);
  }

  const submenu = Menu.buildFromTemplate([
    {
      label: 'Pin On Top',
      type: 'checkbox',
      checked: false,
      click: (menuItem) => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
          const newState = !focusedWindow.isAlwaysOnTop();
          focusedWindow.setAlwaysOnTop(newState);
          menuItem.checked = newState;
          // Notify renderer process of the change
          focusedWindow.webContents.send('windowData:alwaysOnTopChanged', newState);
        }
      },
      accelerator: 'CommandOrControl+Shift+P'
    },
    {
      label: 'Close myPod',
      role: 'quit',
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4'
    }
  ]);
  
  menu.append(new MenuItem({ label: 'Options', submenu }));
  Menu.setApplicationMenu(menu);
}

module.exports = { setupKeybinds };
