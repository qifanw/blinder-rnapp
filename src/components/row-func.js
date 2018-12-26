import React, { Component } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, Image, View
} from 'react-native';
import {font, color, gap} from '../common/standard'

export class RowFunc extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onPress = () => {}, sourceRight,source, text = "", desc = "", containerStyle={},textStyle = {}, descStyle = {}, hasRightArrow = true, hasBottomBorder = true ,maxLine =0 ,disabled=false} = this.props;

    return (
      <TouchableOpacity   disabled={disabled} style={[styles.container,containerStyle, hasBottomBorder ? {} : {borderBottomWidth: 0}]} onPress={() => onPress()} activeOpacity={1}>
        { source ? <Image style={styles.icon} source={source} /> : null}

        <View style={styles.textView}>
          <Text numberOfLines={maxLine} style={[styles.text, textStyle]}>{text}</Text>
          <Text numberOfLines={maxLine} style={[styles.desc, descStyle]}>{desc}</Text>
        </View>

        {hasRightArrow && <Image style={styles.rightIcon} source={require('./images/ic_ejjt.png')} />}
       { sourceRight ? <Image style={[styles.icon,sourceRightStyles]} source={sourceRight} /> : null}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    borderColor: color["c16"],
    borderBottomWidth: 1
  },
  icon: {
    marginRight: 15
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: font["f6"],
    color: color["c2"]
  },
  desc: {
    fontSize: font["f4"],
    color: color["c4"],
    marginLeft:30,
    marginRight: 0
  },
  rightIcon: {
    marginLeft: 10
  }
});