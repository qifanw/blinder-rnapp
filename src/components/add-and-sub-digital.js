import React, { Component } from 'react';
import {
  Image, TouchableOpacity, StyleSheet, Text, Input, TextInput, View, Keyboard, Platform
} from 'react-native';
import { isNaN } from 'lodash'
import { gap, color, font } from '../common/standard';
import { isNumber } from 'lodash'
export class AddAndSubDigital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || 0
    }
  }
  getValue() {
    return this.state.number || 0;
  }
  getCheckNumber(number, props = this.props) {
    const { step = 1, lowerLimit = 0, upperLimit = 0 } = props;
    if (lowerLimit > upperLimit || number <= 0) return 0;
    if (number < lowerLimit) number = lowerLimit;
    if (number > upperLimit) number = upperLimit;
    let left = (number - lowerLimit) % step;
    if (left != 0) {
      number = number - left;
    }
    return number;
  }
  handleInputChange(value) {
    isNaN(Number(value)) && (value = 0)
    this.handleChange(number)
  }
  getAddNum() {
    const { step = 1, lowerLimit = 0, upperLimit = 0 } = this.props;
    let stateNumber = this.state.number;
    let num = this.matrixingMath(step)
    console.log("gggggggggggggggg", num)
    // 若当前数为初值0，那他的下一次加数应为下限，反之为步长
    let addNum = lowerLimit != 0 && stateNumber == 0 ? lowerLimit : step;
    // 若上限不足下限或上限越界
    if (lowerLimit > upperLimit || stateNumber + addNum > upperLimit) return;
    console.log("vvvvvvvvvvv", stateNumber * num + addNum * num)
    return (stateNumber * num + addNum * num).toFixed(0);
  }
  getSubNum() {
    const { step = 1, lowerLimit = 0, upperLimit = 0 } = this.props;
    let stateNumber = this.state.number;
    let num = this.matrixingMath(step)
    console.log("gggggggggggggggg", num)
    // 若当前数减去步长小于下限，那他的下一次减数应为下限，反之为步长
    let subNum = lowerLimit != 0 && stateNumber - step < lowerLimit ? lowerLimit : step;
    // 若上限不足下限或0越界
    if (lowerLimit > upperLimit || stateNumber - subNum < 0) return 0;
    console.log("vvvvvvvvvvv", stateNumber * num - subNum * num)
    return (stateNumber * num - subNum * num).toFixed(0);
  }
  handleBtn(type) {
    let number = this.state.number;
    let num = this.matrixingMath(this.props.step)
    console.log("gggggggggggggggg", num)
    if (type == 'add') {
      number = this.getAddNum();
    } else {
      number = this.getSubNum();
    }
    this.handleChange(number / num)
  }
  handleChange(number) {
    const { onChange = () => { } } = this.props;
    if (isNumber(number)) {
      onChange(number);
      this.setState({ number: Number(number) });
    }
  }
  componentDidMount() {
    this.listener = Keyboard.addListener('keyboardDidHide', () => {
      let number = this.getCheckNumber(Number(this.state.number));
      this.setState({ number });
    });
  }
  componentWillReceiveProps(nextProps) {
    let { number } = this.props;
    console.log("componentWillReceiveProps", number, nextProps.number)
    if (number != nextProps.number) {
      let nextNumber = nextProps.number
      // this.getCheckNumber(nextProps.number, nextProps);
      this.setState({ number: nextNumber });
    }
  }
  matrixingMath(step) {
    let num = 0
    if (step > 1) {
      num = 1
    } else {
      num = 1 / step
    }
    return num
  }
  componentWillUnmount() {
    this.listener.remove();
  }
  render() {
    const { lowerLimit = 0, upperLimit = 0, step = 1, btnStyle = {}, inputStyle = {}, enableInput = true } = this.props;
    const { number } = this.state;
    console.log(number)
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.handleBtn('sub')}>
            <Text style={[styles.btn, btnStyle]}>-</Text>
          </TouchableOpacity>
          {
            enableInput && <TextInput
              value={'' + number}
              onChangeText={value => this.handleInputChange(value)}
              style={[styles.input, Platform.OS == 'android' ? {} : {}, inputStyle]}
              underlineColorAndroid="transparent"
              placeholder=""
              placeholderTextColor={color["c2"]}
            />
          }
          {
            !enableInput && <Text style={[styles.input, Platform.OS == 'android' ? {} : {}, inputStyle]}>{number}</Text>
          }
          <TouchableOpacity activeOpacity={1} onPress={() => this.handleBtn('add')}>
            <Text style={[styles.btn, btnStyle]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 20,
    color: color["c2"],
    height: 40,
    width: 40,
    borderColor: color["c16"],
    borderWidth: 1,
    textAlign: "center",
    lineHeight: 36
  },
  disabledbtn: {
    color: color["c5"],
  },
  input: {
    fontSize: 20,
    color: color["c2"],
    width: 50,
    height: 40,
    textAlign: "center",
    borderColor: color["c16"],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 0
  }
});