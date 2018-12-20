import React, { Component } from 'react';
import {
  Image, TouchableOpacity
} from 'react-native';

export class RightImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum:0
    }
  }

  render() {
    const { onPress = () => {}} = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <Image source={this.state.sum>0?require("./images/ic_znxhd.png"):require("./images/ic_znx.png")} style={{marginRight: 15}}/>
      </TouchableOpacity>
    )
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        sum:nextProps.sum
      })
    }

}
