# myPod
<table>
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/54b4feae-907d-4331-983b-32767fa55efe" width="150" />
    </td>
    <td style="vertical-align: top; padding-top: 0;">
      <strong>myPod</strong> is a standalone podcast client styled like a
      <strong>5th Generation iPod Nano</strong>!
      <h1>Features</h1>
      <ul>
        <li>Add any podcast from its RSS link</li>
        <li>Automatic ingest of episodes</li>
        <li>Resume where you left off between sessions</li>
        <li>Indication of new/in progress episodes</li>
        <li>Caching and interval updates of all content</li>
      </ul>
      <a href="https://youtu.be/2hv2Y2gY2DE">Video Demo</a>
      <p>This app was build for, and only tested on, macOS</p>
    </td>
  </tr>
</table>

## Table of Contents
- [Installation](#installation)
- [Podcasts and RSS](#podcasts-and-rss)
- [How To Use](#how-to-use)
  - [Moving the window](#moving-the-window)
  - [Closing the window](#closing-the-window)
  - [Navigating the player](#navigating-the-player)
  - [Adding a podcast](#adding-a-podcast)
  - [Playing episodes](#playing-episodes)
  - [Removing podcasts](#removing-podcasts)
- [Build From Source](#build-from-source)

## Installation
If you are using `macOS` on an `M-Series` device, you can download the demo from the GitHub "Releases" </br>
Otherwise, see the [Build From Source](#build-from-source) section.

## Podcasts and RSS
Most podcasts are published through RSS feeds using an open standard to share their content. </br>
You can find more information about podcasts and RSS in [this article](https://podcast.adobe.com/en/guides/podcast-rss-feeds) from Adobe. </br>
To use myPod, you will first need to find the RSS feed of the podcast you want to listen to. [Podcastindex.org](https://podcastindex.org/stats) should have RSS links to most publicly available podcasts, but any source will do.

## How To Use
### Moving the window
To move the player window, click at the top of the frame (where a window frame would normally appear) and drag the window

### Closing the window
Simply press `CMD + Q` on macOS or `ALT + F4` on Windows to quit. The standard window frame and window controls are hidden for a cleaner look.

### Navigating the player
You can use arrow keys and `Enter` to navigate through menu items. To return to the previous screen, press the `Menu` button on the navigation circle, or press `Escape`. </br>
You can also click on any of the buttons or items to select them.

### Adding a podcast
To add a podcast, navigate to "+ Add Podcast" on the home screen. Paste in an RSS link (see [Podcasts and RSS](#podcasts-and-rss) to get one), then press "Add Podcast".

### Playing episodes
Once you have added a podcast, select it and choose and episode. To skip around, use the "forward" and "backwards" buttons on the navcircle. The play/pause button is also located in the navcircle. You can also "scrub" to a selected point in the podcast using by hovering over the player bar and clicking/dragging. If you leave an episode and return, the player will resume where you left off. </br>
A blue circle will appear next to any episodes in a podcast which have not been started. </br>
Podcasts will be refreshed once every 24hrs.

### Removing podcasts
Not yet implemented

## Build From Source

### Prerequisites

Before building myPod from source, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Build tools** for native dependencies (only for building the full app, not required for testing):
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: `build-essential` or equivalent
  - **Windows**: Visual Studio Build Tools or Visual Studio with C++ workload

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/myPod.git
   cd myPod
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development mode**
   To run the app in development mode with hot reload. If you just want to test the app, you can stop here:
   ```bash
   npm run dev
   ```

4. **Build for production**
   To build the frontend assets:
   ```bash
   npm run build
   ```

5. **Package the application**
   To create distributable packages for your platform:
   ```bash
   npm run make
   ```

   This will create platform-specific installers in the `out/` directory:
   - **macOS**: `.dmg` and `.zip` files
   - **Windows**: `.exe` installer (Squirrel)
   - **Linux**: `.deb` and `.rpm` packages

