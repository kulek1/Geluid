// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _throttle from 'lodash/throttle';
import cs from 'classnames';
import { openSettings } from '../../actions';
import settingsIcon from '../../img/ic-setting.svg';
import SettingsDialog from '../SettingsDialog';

type Props = {
  listenersCount: number,
  openSettings: func
};

const CLASSNAMES = {
  animating: 'animating',
  end: 'end',
  current: 'listeners__current',
  incoming: 'listeners__incoming'
};

class ActiveListeners extends Component<Props> {
  props: Props;
  state = {
    firstNumber: CLASSNAMES.current,
    secondNumber: CLASSNAMES.incoming,
    isAnimating: false,
    isTransitionEnd: false,
    previousListeners: 0
  };

  componentDidUpdate() {
    if (this.state.previousListeners === this.props.listenersCount) return;

    this.checkIsAnimatingThrottle();
  }

  numberContainer = React.createRef();
  checkIsAnimatingThrottle = _throttle(() => this.checkIsAnimating(), 2000);

  checkIsAnimating() {
    if (this.state.isAnimating) return;
    const { listenersCount } = this.props;

    this.setState({
      previousListeners: listenersCount
    });
    const incomingEl = this.numberContainer.current.querySelector(`.${CLASSNAMES.incoming}`);
    incomingEl.innerText = listenersCount;

    this.animate();
    setTimeout(() => this.onTransitionEnd(), 600);
  }

  animate = () => {
    this.setState({
      isAnimating: true
    });
  };

  onTransitionEnd() {
    let firstNumber;
    let secondNumber;

    if (this.state.firstNumber !== CLASSNAMES.incoming) {
      firstNumber = CLASSNAMES.incoming;
      secondNumber = CLASSNAMES.current;
    } else {
      firstNumber = CLASSNAMES.current;
      secondNumber = CLASSNAMES.incoming;
    }

    this.setState({
      firstNumber,
      secondNumber,
      isTransitionEnd: true
    });

    this.disableAnimating();
  }

  disableAnimating = () =>
    this.setState({
      isAnimating: false,
      isTransitionEnd: true
    });

  render() {
    return (
      <div className="box box--blue box__listeners">
        <div className="box__content">
          <div className="content__status">
            <p>Active listeners:</p>
            <div
              className={cs('listeners', {
                [CLASSNAMES.animate]: this.state.isAnimating,
                [CLASSNAMES.end]: this.state.isTransitionEnd
              })}
              ref={this.numberContainer}
            >
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
        <SettingsDialog />
      </div>
    );
  }
}

const mapStateToProps = ({ server }) => ({
  listenersCount: server.listenersCount
});

const mapDispatchToProps = {
  openSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveListeners);
