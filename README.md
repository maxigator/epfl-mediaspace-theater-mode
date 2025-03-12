# EPFL MediaSpace Theater Mode Extension

## Description
This Chrome extension adds a "Theater Mode" button to videos on EPFL MediaSpace (Kaltura).  
Clicking the button expands the video to fill the browser window without entering fullscreen.

## How it works
- Detects if the webpage contains a Kaltura video player.
- Injects a "Theater Mode" toggle button into the video controls.
- Clicking the button expands the video to fill the entire viewport.
- Clicking again returns the video to its original size.

## Installation from source
1. Download or clone this repository to your computer.
2. In Chrome, go to `chrome://extensions`.
3. Enable "Developer mode" (top-right corner).
4. Click "Load unpacked" and select the folder containing this extension.