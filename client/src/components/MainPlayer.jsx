import React, { Component } from 'react';
import Slider from 'rc-slider';
import silenceMp3 from '../assets/silence.mp3'

class MainPlayer extends Component {
  constructor(props) {
    super(props);

    this.player = null;
    this.playerPlayBtn = null;
    this.playerTotalTime = null;
    this.playerVolume = null;
    this.state = {
      playerTime: '0:00',
      playerTotalTime: '0:00',
      playerVolume: 0,
    };
  }

  componentDidMount() {
    this.initVolume();
    this.player.addEventListener('loadedmetadata', () => this.setTotalTime());
    this.player.addEventListener('timeupdate', () => this.updateProgress());
    this.player.addEventListener('playing', () => this.setPlay());


    this.playerPlayBtn.addEventListener('click', () => this.togglePlay());
  }

  onVolumeChange(value) {
    this.setState({
      playerVolume: value
    });
    this.player.volume = value / 100;
  }

  togglePlay() {
    if (this.player.paused) {
      this.setPlay();
      this.player.play();
    } else {
      this.setPause();
      this.player.pause();
    }
  }

  setPlay() {
    this.playerPlayBtn.attributes.d.value = 'M0 0h6v24H0zM12 0h6v24h-6z';
  }

  setPause() {
    this.playerPlayBtn.attributes.d.value = 'M18 12L0 24V0';
  }

  initVolume() {
    this.setState({
      playerVolume: this.player.volume * 100
    });
  }

  setTotalTime() {
    this.setState({
      playerTotalTime: this.formatDuration(this.player.duration),
    });
  }

  updateProgress() {
    const current = this.formatDuration(this.player.currentTime);
    // const percent = (current / this.player.duration) * 100;
    // progress.style.width = percent + '%';
    this.setState({
      playerTime: current,
    });
  }

  formatDuration(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return time === Infinity ? time : `${min}:${((sec < 10) ? (`0${sec}`) : sec)}`;
  }

  isLive() {
    return this.state.playerTotalTime === Infinity;
  }

  render() {
    return (
      <>
      <iframe title="silence" src={silenceMp3} allow="autoplay" id="audio" className="audio-context-hack"></iframe>
      <div className="audio-player">
        <div className="audio-player__play-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
            <path
              fill="#566574"
              fillRule="evenodd"
              d="M18 12L0 24V0"
              className="play-pause-icon"
              ref={(el) => { this.playerPlayBtn = el; }}
            />
          </svg>
        </div>

        <div className="audio-player__controls">
          <span className="controls__current-time">{this.state.playerTime}</span>
          <div className="controls__slider">
            <div className={`progress ${this.isLive() ? 'live' : ''}`.trim()}>
              <div className="pin" id="progress-pin" data-method="rewind" />
            </div>
          </div>
          <span
            className="total-time"
            ref={(el) => { this.playerTotalTime = el; }}
          >
            {this.isLive() ? 'LIVE' : this.state.playerTotalTime}
          </span>
        </div>

        <div className="audio-player__volume">
          <div className="volume__btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              {/* eslint-disable max-len */}
              <path fillRule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" id="speaker" />
              {/* eslint-enable */}
            </svg>
          </div>
          <div className="audio-player__volume-controls">
            <Slider value={this.state.playerVolume} onChange={(value) => this.onVolumeChange(value)} />
          </div>
        </div>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <audio type="audio/mpeg" id="audio-tag" ref={(el) => { this.player = el; }} autoPlay />
        {/* eslint-disable */}
      </div>
      </>
    );
  }
}

export default MainPlayer;
