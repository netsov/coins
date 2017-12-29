// import React, { Component } from 'react';
// import './style.css';
// import isEqual from 'lodash.isequal';
// import { Chart } from '../Chart';
//
// import { intervalMixin } from '../../utils/mixins';
//
// export class Position extends intervalMixin(Component) {
//
//   shouldComponentUpdate(nextProps, nextState) {
//     const propsKeys = ['position'];
//     const stateKeys = [];
//
//     return (
//       stateKeys.some(key => !isEqual(this.state[key], nextState[key])) ||
//       propsKeys.some(key => !isEqual(this.props[key], nextProps[key]))
//     );
//   }
//
//   async componentDidMount() {
//     // if (position.symbol !== 'BTC')
//   }
//
//   handleZoom = zoom => () => {
//     // https://github.com/highcharts/highcharts/issues/2775
//     setTimeout(async () => {
//       this.props.updatePosition({ ...this.props.position, zoom });
//       // await this.fetchData();
//     }, 1);
//   };
//
//   render() {
//     const {
//       position: { zoom, symbol },
//     } = this.props;
//
//     console.log(symbol, 'rendered');
//
//     return <Chart zoom={zoom} usd={[]} btc={[]} handleZoom={this.handleZoom} />;
//   }
// }
