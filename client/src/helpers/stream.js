//
// [DRAFT]
// WebRTC Streaming Video<->Video
//

import openSocket from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import adapter from 'webrtc-adapter';
import Socket from './socket';

const { socket } = Socket;

class Stream {
  constructor() {
    this.uuid = null;
    this.localStream = null;
    this.localVideo = null;
    this.remoteVideo = null;
    this.serverConnection = null;
    this.peerConnection = null;
    this.peerConnectionConfig = {
      iceServers: [
        {
          urls: 'stun:stun.services.mozilla.com'
        },
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    };
    this.constraints = {
      video: false,
      audio: true
    };

    this.initStream = this.initStream.bind(this);
    this.getUserMediaSuccess = this.getUserMediaSuccess.bind(this);
    this.gotMessageFromServer = this.gotMessageFromServer.bind(this);
    this.gotRemoteStream = this.gotRemoteStream.bind(this);
    this.gotIceCandidate = this.gotIceCandidate.bind(this);
    this.start = this.start.bind(this);
    this.createdDescription = this.createdDescription.bind(this);
    this.initStream = this.initStream.bind(this);
  }

  initStream() {
    this.uuid = this.createUUID();
    this.localVideo = document.getElementById('localVideo');
    this.remoteVideo = document.getElementById('remoteVideo');

    socket.emit('room', 'temp1');
    socket.on('message', data => {
      this.gotMessageFromServer(data);
    });

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.getUserMediaSuccess)
        .catch(this.fireError);
    } else {
      alert('Your browser does not support getUserMedia API');
    }
  }

  getUserMediaSuccess(stream) {
    this.localStream = stream;
    this.localVideo.srcObject = stream;
  }

  fireError(error) {
    throw error;
  }

  createdDescription(description) {
    this.peerConnection
      .setLocalDescription(description)
      .then(() => {
        const payload = {
          sdp: this.peerConnection.localDescription,
          uuid: this.uuid
        };
        return socket.emit('message', payload);
      })
      .catch(this.fireError);
  }

  gotMessageFromServer(message) {
    console.log(message);
    if (!this.peerConnection) this.start(false);

    const signal = message;
    console.log(`incoming: ${signal.uuid} - local: ${this.uuid}`);
    // Object.prototype.hasOwnProperty.call(signal, 'uuid') &&
    if (signal.uuid === this.uuid) {
      console.log('UUID is the same! abort');
      return;
    }

    if (signal.sdp) {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(signal.sdp),
        () => {
          if (signal.sdp.type === 'offer') {
            console.log('offer');
            return this.peerConnection
              .createAnswer()
              .then(this.createdDescription)
              .catch(this.fireError);
          }
        },
        this.fireError
      );
      console.log(this.peerConnection);
    } else if (signal.ice) {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(signal.ice))
        .catch(this.fireError);
    }
  }

  start(isCaller) {
    this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
    this.peerConnection.onicecandidate = this.gotIceCandidate;
    this.peerConnection.ontrack = this.gotRemoteStream;
    this.peerConnection.addStream(this.localStream);

    if (isCaller) {
      this.peerConnection
        .createOffer()
        .then(this.createdDescription)
        .catch(this.errorHandler);
    }
  }

  gotIceCandidate(event) {
    if (!event.candidate) return;
    const payload = {
      ice: event.candidate,
      uuid: this.uuid
    };
    socket.emit('message', payload);
  }

  gotRemoteStream(event) {
    console.log('> GOT REMOTE!');
    this.remoteVideo.srcObject = event.streams[0];
  }

  createUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return (
      `${s4() +
      s4()
      }-${
        s4()
      }-${
        s4()
      }-${
        s4()
      }-${
        s4()
      }${s4()
      }${s4()}`
    );
  }
}

export default Stream;
