import React, { Component } from 'react';
import cs from 'classnames';
import { connect } from 'react-redux';
import _throttle from 'lodash/throttle';

import { openSettings as openSettingsAction } from 'store/app/actions';
import SettingsDialog from 'components/SettingsDialog';
import settingsIcon from 'img/ic-setting.svg';
import { ServerDefaultState } from 'store/server/reducer';

type Props = {
  listenersCount: number;
  openSettings: () => void;
};

const CLASSNAMES = {
  animating: 'animating',
  end: 'end',
  current: 'listeners__current',
  incoming: 'listeners__incoming'
};

class ActiveListeners extends Component<Props> {
  state = {
    firstNumber: CLASSNAMES.current,
    secondNumber: CLASSNAMES.incoming,
    isAnimating: false,
    isTransitionEnd: false,
    previousListeners: 0
  };
  numberContainer = React.createRef<HTMLDivElement>();
  checkIsAnimatingThrottle = _throttle(() => this.checkIsAnimating(), 2000);

  componentDidUpdate() {
    const { previousListeners } = this.state;
    const { listenersCount } = this.props;

    if (previousListeners === listenersCount) return;

    this.checkIsAnimatingThrottle();
  }

  checkIsAnimating() {
    const { isAnimating } = this.state;

    if (isAnimating) return;
    const { listenersCount } = this.props;

    this.setState({
      previousListeners: listenersCount
    });
    // @ts-ignore
    const incomingEl: HTMLElement = this.numberContainer.current.querySelector(
      `.${CLASSNAMES.incoming}`
    );
    if (incomingEl) {
      incomingEl.innerText = `${listenersCount}`;
    }

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
    const { isTransitionEnd, firstNumber, secondNumber } = this.state;
    const { openSettings } = this.props;

    return (
      <div className="box box--blue box__listeners">
        <div className="box__content">
          <div className="content__status">
            <p>Active listeners:</p>
            <div
              className={cs('listeners', {
                [CLASSNAMES.end]: isTransitionEnd
              })}
              ref={this.numberContainer}
            >
              <span className={firstNumber}>0</span>
              <span className={secondNumber}>0</span>
            </div>
          </div>
          <div className="content__settings">
            <button type="button" onClick={openSettings}>
              <img src={settingsIcon} alt="Open settings" />
            </button>
          </div>
        </div>
        <SettingsDialog />
      </div>
    );
  }
}

const mapStateToProps = ({ server }: { server: ServerDefaultState }) => ({
  listenersCount: server.listenersCount
});

const mapDispatchToProps = {
  openSettings: openSettingsAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveListeners);
