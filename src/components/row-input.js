import React, { Component } from 'react';
import {
  Image, TouchableOpacity, StyleSheet, View, TextInput,Platform
} from 'react-native';
import { back as backFunc} from '../router'
import { color, font, gap } from '../common/standard'

export class RowInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearShow: false,
      value: this.props.defaultValue || this.props.value || ""

    }
  }
  handleInputChange(value) {
    console.log('handleInputChange')
    const { onChangeText = () => {} } = this.props;
    let state = {value, clearShow: true}
    onChangeText(value);
    value == "" && (state.clearShow = false)
    this.setState(state);
  }
  getValue() {
    console.log('getValue')
    return this.state.value;
  }
  handleClear() {
    console.log('handleClear')
    const { onPress = () => {} } = this.props;
    this.handleInputChange("")
  }
  
  componentWillReceiveProps(nextProps) {
    const { value , defaultValue } = this.props;
    if (value != undefined || defaultValue != undefined){
      this.setState({
        value: value || defaultValue
      });
    }
  }
  render() {
    const { placeholder = "",maxLength=31, keyboardType ="default", mode ="default", clearShow = true, inputStyle={}, onBlur = () => {}, onFocus = () => {},onChange = ()=>{} ,value = "", onPress = () => {} } = this.props;
    let secureTextEntry = mode == 'password' ? true : false;
    let multiline = mode == 'multiline' ? true : false;
    
    return (
      <View style={styles.container}>
        <TextInput
          value = {this.state.value}
          onChangeText = {value => this.handleInputChange(value)}
          style={[styles.input, inputStyle]}
          underlineColorAndroid="transparent"
          placeholder={ placeholder || "请输入关键字" }
          placeholderTextColor={color["c5"]}
          keyboardType={keyboardType}
          maxLength ={maxLength}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          onChange ={()=>onChange()}
          onBlur={() => onBlur()}
          onFocus={() => onFocus()}
        />
        
        {
          (clearShow && this.state.clearShow) &&
          <TouchableOpacity style={styles.labelClear} onPress={() => this.handleClear()}>
            <Image source={require("./images/ic_srkch.png")}/>
          </TouchableOpacity>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color["c1"],
    minHeight: 49,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    flexGrow: 1 // 这里的flexGrow用来撑开剩余空间
  },
  input: {
    backgroundColor: color["c1"],
    fontSize: font["f6"],
    color: color["c2"],
    flex: 1,
    paddingVertical: 0
  },
  labelClear: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});