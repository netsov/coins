import React, { Component } from 'react';
import './style.css';

class Positions extends Component {
  async componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { positions } = this.props;
    return positions.map(p => <p>{p.symbol}</p>);
  }
}

export default Positions;
