<div align="center">
  <h1>Geluid</h1>
  <img src="https://raw.githubusercontent.com/kulek1/readmeimages/master/geluid.png" />
  <h3>Low latency streaming audio from soundcard directly to the browser.</h3>
  <p>Use on any desktop or mobile device.</p>
</div>

<br/>

Application based on `Electron`, `React`, `React-Router`, `Webpack`, `Socket.io (WebSockets)`, `PortAudio` and `Lame`.
It combines advantages of those packages to create a nice looking application.

## Usage

> :warning: This application is still under development and it's not a stable version.

### Developing

Build the client web app:

```
yarn build-client
```

Then build Electron app:

```
yarn dev
```

It will run Electron application and browser client (React) on two different ports.

Client: (http://localhost:9000)

## How it works?

<div align="center">
  <img src="https://raw.githubusercontent.com/kulek1/readmeimages/master/geluid-how-it-works.png" />
</div>

It creates two instances of applications - client & server.
Server is based on `Electron` also with `React` and uses `node module (C++)` called `naudiodon-lame` to stream mp3 audio from soundcard to `Node.js` app and then from `Node.js` to Browser via `WebSocket` (Socket.io).

Client is based on React and it uses `WebWorkers` for buffering audio to get low latency sound.
Despite complicated steps, latency of audio is at the level of ~1 second!

Windows users might have something like "Stereo mix" in an audio control panel which picks up exactly what you hear from your speakers. Unfortunately, that device isn't available in macOS out of the box. The solution is to install open source kernel extension called [Soundflower](https://rogueamoeba.com/freebies/soundflower/)

## Features to do:

- Code refactoring
- Improve stability
- Make production build for Windows & Mac
- Improve scalability
- Add missing features...

## Issues

- You may encounter an error:

```
App threw an error during load
Error: The module '/Users/username/Geluid/node_modules/naudiodon-lame/build/Release/naudiodon-lame.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 59. This version of Node.js requires
NODE_MODULE_VERSION 57. Please try re-compiling or re-installing
```

To resolve this, run in your terminal: `$(npm bin)/electron-rebuild`.

- as this application uses `MediaSource`, iOS isn't supported yet. (Why Apple?)
