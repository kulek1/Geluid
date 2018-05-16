import openSocket from 'socket.io-client';
import DecoderWorker from '../workers/worker-decoder';

const ss = require('socket.io-stream');
require('webrtc-adapter');

const socket = openSocket(`${window.location.hostname}:3010`);
const storage = localStorage;

const decoder = new DecoderWorker();

class Socket {
  constructor() {
    this.errorAttemps = 5;
    this.bindSocketError();
    this.initRoomId();
    this.initWorkerEvent();

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioCtx();

    this.codecString = 'audio/mpeg';
    this.audio = null;
    this.mediaSource = null;
    this.tagBuffer = [];
    this.tagQueue = [];
    this.isCustomBuffer = false;
    this.unlockMobileSafari();
  }

  initAudioTag() { // fired from SidePicker.jsx
    this.audio = document.getElementById('audio-tag');
    this.mediaSource = new MediaSource();
    this.audio.src = window.URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', () => {
      this.tagBuffer = this.mediaSource.addSourceBuffer(this.codecString);
      this.tagBuffer.mode = 'sequence';

      this.tagBuffer.addEventListener('updateend', () => this.playAudio(), { once: true });
    });
  }

  playAudio() {
    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1
                    && navigator.userAgent && !navigator.userAgent.match('CriOS');
    if (!isSafari) this.audio.play();
  }

  async updateBuffer(chunk) {
    if (!this.tagBuffer.updating && this.tagQueue.length > 0) {
      this.tagBuffer.appendBuffer(this.tagQueue.shift());
    } else if (!this.tagBuffer.updating) {
      this.tagBuffer.appendBuffer(chunk);
    } else {
      this.tagQueue.push(chunk);
    }
  }

  initWorkerEvent() {
    decoder.onmessage = async ({ data }) => this.updateBuffer(data.bufferMp3);
  }

  bindSockets() {
    socket.emit('stream', {
      my: 'data'
    });

    ss(socket).on('audio-stream', (stream) => {
      console.log('DATA -->> ');

      if (this.isCustomBuffer) {
        stream.on('data', async chunk => {
          decoder.postMessage({ decode: chunk.buffer }, [chunk.buffer]);
        });
      } else {
        stream.on('data', async chunk => {
          this.updateBuffer(chunk);
        });
      }

      stream.on('end', () => console.warn('end'));
    });
  }

  bindSocketError = () => {
    let counter = 0;
    socket.on('connect_error', () => {
      if (!socket.disconnected) return;
      if (counter + 1 === this.errorAttemps) socket.close();
      counter++;
    });
  }

  initRoomId() {
    const localSocketId = this.getSocketIdFromLocalStorage();
    if (!localSocketId) {
      this.generateSocketId();
      this.setStorage();
    } else {
      this.setSocketIdFromLocalStorage();
    }
    this.joinToRoom();
  }

  unlockMobileSafari() {
    if (this.context.state === 'suspended' && 'ontouchstart' in window) {
      /* eslint-disable */
      // resume WebAudio context
      const unlock = () => this.context.resume().then(() => {
        document.body.removeEventListener('touchstart', unlock);
        document.body.removeEventListener('touchend', unlock);
      }, (error) => {
        console.log(error);
      });
      document.body.addEventListener('touchstart', unlock);
      document.body.addEventListener('touchend', unlock);
      /* eslint-enable */
    }
  }

  setSocketIdFromLocalStorage() {
    this.socketId = this.getSocketIdFromLocalStorage();
  }

  getSocketIdFromLocalStorage() {
    return storage.getItem('ID');
  }

  joinToRoom() {
    socket.emit('room', this.socketId);
  }

  generateSocketId() {
    this.socketId = this.generateId();
  }

  generateId() {
    return Math.floor(1000 + (Math.random() * 9000));
  }

  setStorage() {
    storage.setItem('ID', this.socketId);
  }

  sendMessage(message) {
    console.log('Client sending message: ', message);
    socket.emit('message', message);
  }
}

export default new Socket();
