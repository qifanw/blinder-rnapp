import React, { Component } from 'react';
import {
  Image, TouchableHighlight, View, StyleSheet, Text
} from 'react-native';
import { color, gap, font } from '../common/standard'

export class RowButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress = () => {}, disabled = false, text = "", normalStyle = {}, disabledStyle = {}, textStyle = {}, underlayColor = color.c20} = this.props;

    return (
      <View>
        {
          disabled ? 
          <TouchableHighlight style={[styles.button, styles.disabled, disabledStyle]} activeOpacity={1}>
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
          </TouchableHighlight> :
          <TouchableHighlight style={[styles.button, styles.normal, normalStyle]} onPress={() => onPress()} activeOpacity={1} underlayColor={underlayColor}>
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
          </TouchableHighlight>
        }
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  normal: {
    backgroundColor: color["c6"]
  },
  disabled: {
    backgroundColor: "#adcaec"
  },
  textStyle: {
    fontSize: font["f6"],
    color: color["c1"]
  }
});