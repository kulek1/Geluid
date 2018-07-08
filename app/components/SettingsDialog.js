// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeSettings } from '../actions/';
import backIcon from '../img/ic-back.svg';

type Props = {
  isSettingsDialog: boolean,
  closeSettingsDialog: func
};
class SettingsDialog extends Component<Props> {
  props: Props;

  render() {
    const { isSettingsDialog, closeSettingsDialog } = this.props;
    return (
      <CSSTransition
        in={isSettingsDialog}
        timeout={300}
        classNames="box__settings-dialog"
        unmountOnExit
      >
        <div className="box box--blue box__settings-dialog">
          <button type="button" onClick={closeSettingsDialog}>
            <img src={backIcon} alt="Back" />
          </button>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => ({
  isSettingsDialog: state.app.isSettingsDialog,
});

const mapDispatchToProps = {
  closeSettingsDialog: closeSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
