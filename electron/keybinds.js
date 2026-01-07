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
      click: () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
          focusedWindow.setAlwaysOnTop(!focusedWindow.isAlwaysOnTop());
          submenu.checked = focusedWindow.isAlwaysOnTop();
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
