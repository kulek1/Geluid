// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _throttle from 'lodash/throttle';
import { openSettings } from '../actions/';
import settingsIcon from '../img/ic-setting.svg';

type Props = {
  listenersCount: number,
  openSettings: func
};

class ActiveListeners extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.numberContainer = React.createRef();

    this.classNames = {
      current: 'listeners__current',
      incoming: 'listeners__incoming',
    };
    this.state = {
      firstNumber: this.classNames.current,
      secondNumber: this.classNames.incoming,
      isAnimating: false,
      previousListeners: 0,
    };
    this.animate = this.animate.bind(this);
    this.disableAnimating = this.disableAnimating.bind(this);
    this.checkIsAnimatingThrottle = _throttle(() => this.checkIsAnimating(), 2000);
  }

  componentDidUpdate() {
    if (this.state.previousListeners === this.props.listenersCount) return;

    this.checkIsAnimatingThrottle();
  }

  checkIsAnimating() {
    if (this.state.isAnimating) return;

    this.setState({
      previousListeners: this.props.listenersCount,
    });
    const incomingEl = this.numberContainer.current.querySelector(`.${this.classNames.incoming}`);
    incomingEl.innerText = this.props.listenersCount;

    this.animate();
    setTimeout(() => this.onTransitionEnd(), 600);
  }

  animate() {
    this.setState({
      isAnimating: true,
    });
    this.numberContainer.current.classList.add('animating');
  }

  onTransitionEnd() {
    this.numberContainer.current.classList.add('end');

    if (this.state.firstNumber !== this.classNames.incoming) {
      this.setState({
        firstNumber: this.classNames.incoming,
        secondNumber: this.classNames.current,
      });
    } else {
      this.setState({
        firstNumber: this.classNames.current,
        secondNumber: this.classNames.incoming,
      });
    }

    this.disableAnimating();
  }

  disableAnimating() {
    this.numberContainer.current.classList.remove('animating', 'end');
    this.setState({
      isAnimating: false,
    });
  }

  render() {
    return (
      <div className="box box__listeners">
        <div className="box__content">
          <div className="content__status">
            <p>Active listeners:</p>
            <div className="listeners" ref={this.numberContainer}>
              <span className={this.state.firstNumber}>0</span>
              <span className={this.state.secondNumber}>0</span>
            </div>
          </div>
          <div className="content__settings">
            <button type="button" onClick={this.props.openSettings}>
              <img src={settingsIcon} alt="Open settings" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listenersCount: state.server.listenersCount,
});

const mapDispatchToProps = {
  openSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveListeners);
