import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform,Image
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
import { color, font, gap } from '../../common/standard'
// import Camera from 'react-native-camera';
import { WorkSubmit } from './work-submit';
import { WorkUnfinished } from './work-unfinished';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
export class WorkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: 0,    // 0：点击项目详情; 1:点击上链信息

    }
  }
  _changeStatus(status){
    this.setState({
      tag: status
  });
  }
  render() {
    let { tag } = this.state;
    return (
      <View style={styles.container}>
        {tag == 0 ?
          <WorkSubmit style={{ flex: 1 }} /> :
          <WorkUnfinished style={{ flex: 1 }} />}
      
        <View style={styles.title}>
          <TouchableOpacity style={tag == 0 ? styles.myItem1 : styles.myItem} activeOpacity={1} onPress={() => this._changeStatus(0)}>
          <Image source={require('./images/ic_srkch.png')} />
            <Text style={ styles.text1 }>已交作业</Text>
            {/* <View style={tag == 0 ? styles.slide1 : styles.slide2} /> */}
          </TouchableOpacity>
          <View style={{ width: 50 }} />
          <TouchableOpacity style={tag == 1 ? styles.myItem1 : styles.myItem} activeOpacity={1} onPress={() => this._changeStatus(1)}>
          <Image source={require('./images/ic_srkch.png')} />
            <Text style={styles.text1 }>未交作业</Text>
            {/* <View style={tag == 1 ? styles.slide1 : styles.slide2} /> */}
          </TouchableOpacity>
        </View>
      
      
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //   flexDirection: 'row',
  },
  subContainer: {
 //   flex: 1,
    flexDirection: "row",
  
    alignItems: "center",
  },
  title: {
    backgroundColor: "#6F6D68",
    height: 50,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  //  paddingTop: (Platform.OS === 'ios') ? 20 : 0
},
  myItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 68,
    height: 46,
  },
  myItem1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#979797",
    width: 68,
    height: 46,
    borderRadius: 8,
  },

  text1: {
    color: "#E6E6E6",
    fontSize: 12,
  },
  text2: {
    color: color.c8,
    fontSize: font.f5,
  },
  slide1: {
    width: 28,
    height: 2,
   // marginTop: 4,
    backgroundColor: color.c6,
  },
  slide2: {
    width: 28,
    height: 2,
  //  marginTop: 4,
    backgroundColor: color.c1,
  },
});