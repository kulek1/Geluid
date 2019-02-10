// @flow
import React from 'react';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <header className="main-header" />
        {this.props.children}
      </div>
    );
  }
}
