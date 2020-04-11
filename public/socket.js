/* eslint global-require: 0  */

const app = require('express')();
const ss = require('socket.io-stream');
const portAudio = require('naudiodon');
const lame = require('@suldashi/lame');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const EN_ERROR = 'Error';
const EN_RUNNING = 'Running';

let audioDeviceId = -1;
let audioInstance = null;
let encoderInstance = null;

const MAX_CLIENTS = 5;

function reloadAudioInstance(id) {
  console.log('reload instance');
  setAudioDevice(id);
  initAudioInstance();
}

function setAudioDevice(id) {
  audioDeviceId = id;
}

function initAudioInstance() {
  if (audioInstance) {
    return;
  };
  audioInstance = new portAudio.AudioIO({
    inOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: audioDeviceId,
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

   encoderInstance = new lame.Encoder({
    // input
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100,
    // output
    bitRate: 128,
    outSampleRate: 44100,
    mode: lame.STEREO
  });
}

function disableAudioInstance() {
  if (!audioInstance) {
    return;
  };
  audioInstance.quit();
  audioInstance = null;
}

function startAudioStreaming(stream) {
  // handle errors from the AudioInput
  audioInstance.on('error', err => console.error(err));

  // start encoding
  process.stdin.pipe(encoderInstance);
  audioInstance.pipe(encoderInstance);
  audioInstance.start();

  // Start streaming
  encoderInstance.pipe(stream);
}

function initSocketServer() {
  const {
    setServerStatus,
    setServerListeners,
    setServerAudioDevices
  } = require('./electron');
  let isPlaying = false;

  if (!http.listening) {
    http.on('error', () => setTimeout(() => setServerStatus(EN_ERROR), 1500));
    http.listen(3010, () => console.log('listening on *:3010'));
  }

  setTimeout(() => setServerStatus(EN_RUNNING), 1500);
  setServerAudioDevices(portAudio.getDevices());

  io.on('connection', socket => {
    if (isPlaying) {
      socket.disconnect();
    }

    updateListenersCounter(); // User has been connected
    console.log('[NEW USER] -> User has been connected');
    let currentRoom = 'default';
    initAudioInstance();

    socket.on('disconnect', () => {
      console.log('[DISCONNECT]');
      updateListenersCounter();
      disableAudioInstance();
      isPlaying = false;
    });

    socket.on('room', roomName => {
      console.log(`\nClient is trying to connect to room: ${roomName}`);
      let clients = getClientsFromRoom(roomName);

      if (clients >= MAX_CLIENTS) {
        console.log(`Sorry, there are ${MAX_CLIENTS} clients already :(`);
      } else {
        socket.join(roomName);

        // eslint-disable-next-line no-param-reassign
        socket.room = roomName;
        currentRoom = roomName;
      }

      clients = getClientsFromRoom(roomName);
      console.log(`Currently there are ${clients} clients in ${roomName} room`);
    });

    socket.on('stream', () => {
      console.warn('DATA ->');
      const stream = ss.createStream();
      ss(socket).emit('audio-stream', stream, {
        name: 'test'
      });
      startAudioStreaming(stream);

      isPlaying = true;
    });

    socket.on('getDevices', () =>
      io.sockets.to(currentRoom).emit('getDevices', portAudio.getDevices())
    );
  });

  const getClientsFromRoom = roomName => {
    const tempRoom = getRoom(roomName);
    return tempRoom ? Object.keys(tempRoom.sockets).length : 0;
  };

  const getRoom = roomName => io.sockets.adapter.rooms[roomName];

  const getAllClients = () => Object.keys(io.sockets.connected).length;

  const updateListenersCounter = () => setServerListeners(getAllClients());
}

module.exports = { initSocketServer, reloadAudioInstance };
