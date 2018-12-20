import React, { Component } from 'react';
import {
  Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { color, font, gap } from '../common/standard'

export class LeftButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress = () => {}, text = "", textStyle = {} } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress()}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: font["f3"],
    color: color["c2"],
    marginLeft: 15
  }
});