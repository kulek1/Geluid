

<div align="center">
  <h1>Geluid</h1>
<img src="https://raw.githubusercontent.com/kulek1/readmeimages/master/geluid.png">
  <h3>Low latency streaming audio from soundcard directly to the browser.</h3>
  <p>Use on any desktop or mobile device.</p>
</div>

  <br>
Application based on `Electron`, `React`, `React-Router`, `Webpack`, `Socket.io`, `PortAudio`, `Lame` and `WebRTC`.
It combines advantages of those packages to create a nice looking application.
  <h2>Usage</h2>

> :warning: This application is still under development and it's not stable version.


### Installation

Execute command on root directory:
```
npm run dev
```
then:
```
cd client
npm run dev
```
It will run Electron application and browser client.

## How it works?

It creates two instances of applications - client & server.
Server is based on `Electron` and uses `node module (C++)` to stream mp3 audio from soundcard to `Node.js` script and then from `Node.js ` to Browser via `WebSocket` (Socket.io).

Client is based on React and it uses `WebWorkers` for buffering audio to get low latency sound.
Despite complicated steps, latency of audio is at the level of ~1 second!

## Features to do:
- Code refactoring
- Improve stability
- Make production build for Windows & Mac
- Fix responsivness
- Add missing features...