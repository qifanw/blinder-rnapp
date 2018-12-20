import React, { Component } from 'react';
import { View } from 'react-native';
import { NoData } from './no-data';

export class NoDataContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, children, noDataCond = false} = this.props;

    return (
      <View style={style}>
        {!noDataCond && children}

        {noDataCond && <NoData {...this.props}/>}
      </View> 
    )
  }
}
