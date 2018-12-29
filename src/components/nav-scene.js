/**
 * Created by ztian on 2016/12/20.
 */
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Platform, Dimensions
} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import { color, font } from '../common/standard'
import { BackButton } from './back-button'

export class NavScene extends Scene{
  static defaultProps = {
    router: Actions,
    back: true,
    hideNavBar: false,
    renderBackButton: props => props._back == false ? <View></View> : <BackButton />,
   // renderBackButton:() => <BackButton />,
    navigationBarStyle: getNavigationBarStyle(),
    titleStyle: getTitleStyle()
  }


  render() {
    return null;
  }
}

export function getNavigationBarStyle() {
  if(Platform.OS == "ios") {
    return {
      backgroundColor:  "#6F6F6F",
      borderBottomWidth: 0,
    };
  } 

  if(Platform.OS == "android") {
    return {
      backgroundColor: "#6F6F6F",
      borderBottomWidth: 0,
      elevation: 0,
      height: 44
    };
  }
}

export function getTitleStyle() {
  if(Platform.OS == "ios") {
    return {};
  } 

  if(Platform.OS == "android") {
    return {
      width: Dimensions.get('window').width-150,
      textAlign: 'center',
      position: 'absolute',
      fontSize: font["f8"],
      color: color["c2"],
      fontWeight: "normal",
    
    }
  }
}