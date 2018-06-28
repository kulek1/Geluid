//
// [DRAFT]
// SOCKET PCM 16bit CODEC
//

import openSocket from 'socket.io-client';

const ss = require('socket.io-stream');
require('webrtc-adapter');

const socket = openSocket('http://192.168.1.2:3010');
const storage = localStorage;

class Socket {
  constructor() {
    this.initRoomId();
    const audioCtx = window.AudioContext || window.webkitAudioContext;
    this.context = new audioCtx();
    this.buffer = 1764 * 10; // previous buffer 2048

    this.time = 0;

    // ////////////////////
  }

  bindSockets() {
    this.unlockSafari();

    socket.emit('stream', {
      my: 'data'
    });

    ss(socket).on('audio-stream', (stream, data) => {
      let parts = new Float32Array(this.buffer);
      let counter = 0;
      let loopCounter = 0;
      let string;
      console.log('DATA -->> ');

      stream.on('data', chunk => {
        console.log(chunk);
        string = String.fromCharCode.apply(null, chunk);
        const float32 = this.convertString(string);

        for (let i = 0; i < float32.length; i++, counter++) {
          parts[counter] = float32[i];
        }

        if (loopCounter >= 4) {
          loopCounter = 0;
          counter = 0;
          this.sendAsBuffer(parts);
          // this.playAudioFile(chunk);
          parts = new Float32Array(this.buffer);
        }
        loopCounter++;
      });

      // stream.on('data', chunk => {
      //   for (let i = 0; i < chunk.length; i++, counter++) {
      //     partsMp3[counter] = chunk[i];
      //   }
      //   if (loopCounter >= 4) {
      //     loopCounter = 0;
      //     counter = 0;
      //     console.log(partsMp3);
      //     this.playAudioFile(partsMp3);
      //     parts = new Uint8Array(this.buffer);
      //   } else {
      //     loopCounter++;
      //   }
      // });

      stream.on('end', () => {
        console.log('end');
        const audio = document.getElementById('audio');
        /*
        audio.src = (window.URL || window.webkitURL).createObjectURL(
          new Blob(parts, { type: 'audio/wave' })
        ); */

        // var isApple = /Mac|iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // if (!isApple) {
        //   audio.play();
        // }
        // audio.play();
      });
    });
  }

  playAudioFile = chunk => {
    const buffer = new Uint8Array(chunk.length);
    buffer.set(new Uint8Array(chunk), 0);
    this.context.decodeAudioData(buffer.buffer, this.play);
  };

  play = audioBuffer => {
    const source = this.context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.context.destination);
    source.start(this.time);
    this.time += source.buffer.duration;
  };

  sendAsBuffer = receivedBuffer => {
    const myArrayBuffer = this.context.createBuffer(
      2,
      this.buffer,
      this.context.sampleRate * 2
    );
    // console.log(receivedBuffer);
    // myArrayBuffer.copyToChannel(receivedBuffer, 0);
    // myArrayBuffer.copyToChannel(receivedBuffer, 1);

    // This gives us the actual ArrayBuffer that contains the data
    const nowBufferingLeft = myArrayBuffer.getChannelData(0, 16, 44100);
    const nowBufferingRight = myArrayBuffer.getChannelData(1, 16, 44100);

    for (let i = 0; i < myArrayBuffer.length; i++) {
      nowBufferingLeft[i] = receivedBuffer[i];
      nowBufferingRight[i] = receivedBuffer[i];
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    const source = this.context.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(this.context.destination);
    // start the source playing
    source.start(this.time);
    this.time += source.buffer.duration;
  };

  convertBlock(incomingData) {
    // incoming data is a UInt8Array
    let i,
      l = incomingData.length;
    const outputData = new Float32Array(incomingData.length);
    for (i = 0; i < l; i++) {
      // outputData[i] = (incomingData[i] - 128) / 128.0;
      outputData[i] = ((incomingData[i] + 32768) % 65536 - 32768) / 32768.0;
    }
    return outputData;
  }

  convertString = string => {
    const outputData = new Float32Array(string.length / 2);
    for (let i = 0; i < string.length / 2; i++) {
      const word =
        (string.charCodeAt(i * 2) & 0xff) +
        ((string.charCodeAt(i * 2 + 1) & 0xff) << 8);
      outputData[i] = ((word + 32768) % 65536 - 32768) / 32768.0;
    }
    return outputData;
  };

  initRoomId() {
    const localSocketId = this.getStorage();
    if (!localSocketId) {
      this.socketId = this.generateId();
      this.setStorage();
    } else {
      this.socketId = localSocketId;
    }
    this.joinToRoom();
  }

  unlockSafari() {
    // resume WebAudio context
    this.context.resume();
  }

  joinToRoom() {
    socket.emit('room', this.socketId);
  }

  generateId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  getStorage() {
    return storage.getItem('ID');
  }

  setStorage() {
    storage.setItem('ID', this.socketId);
  }

  getDevices() {
    socket.on('getDevices', devices => {
      // console.log(devices);
    });
    socket.emit('getDevices');
  }
  sendMessage(message) {
    console.log('Client sending message: ', message);
    socket.emit('message', message);
  }
}

export default new Socket();
