import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Dimensions, TouchableHighlight, Platform
} from 'react-native';
import { font, color, gap } from '../common/standard'

export class NoData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {logo = require('./images/ic_mysj.png'), text = '暂无数据'} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.image}/>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color["c17"]
  },
  content: {
    width: 160,
    height: 140,
    paddingBottom: 140,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginBottom: 30
  },
  text: {
    fontSize: font["f4"],
    color: color["c3"]
  }
});