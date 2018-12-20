
import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal,
    TouchableHighlight,
    Alert
  } from 'react-native';
import { gap, color, font } from '../common/standard';
import RootSiblings from 'react-native-root-siblings';

const {width, height} = Dimensions.get('window');

export class Dialog extends Component {
  constructor (props) {
    super(props)
  }

  static show (title = "", content = "", buttons = []) {
    this.handle = new RootSiblings(<DialogView title={title} content={content} buttons={buttons} close={() => this.handle.destroy()}/>);
    return this.handle;
  }

  static hide = dialog => {
    if (dialog instanceof RootSiblings) {
        dialog.destroy();
    }
  }

  render() {
    return null;
  }
}

class DialogView extends Component {
  constructor (props) {
      super(props);
  }
  
  render() {
      const { title, content, buttons, close } = this.props;
      return(
        //   <Modal
        //   animationType = 'fade'
        //   visible = {true}
        //   transparent = {true}
        //   onRequestClose = {() => {}} >
        <TouchableOpacity style={{position: "absolute", width:Dimensions.get("window").width, height: Dimensions.get("window").height}} activeOpacity={1}>
            <TouchableHighlight style = {styles.mask} >
              <TouchableHighlight style = {styles.backgroundView}>
                  <View>
                      <View style = {styles.tipBackgroundView}>
                          {title ? <Text style = {styles.tipTitle}> {title}</Text> : null}
                          {content ? <Text style = {styles.tipContent}>  {content} </Text> : null}
                      </View>

                      {buttons.map(({text, onPress = () => {}}, index) => {
                          return (
                              <TouchableHighlight key ={index} style = {styles.buttonBackgroundView} underlayColor = {color.c18} onPress = {() => {close();onPress();}}>
                                  <Text style = { styles.buttonText }>{ text }</Text>
                              </TouchableHighlight>
                          );
                      })}
                  </View>
              </TouchableHighlight>
            </TouchableHighlight>
        </TouchableOpacity>
        //   </Modal>

          )
  }
}

  const styles = StyleSheet.create ({
    mask: {
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width,
        height: height,
        marginLeft: 0,
        marginTop: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundView: {
        width: 250,
        backgroundColor: "white",
        borderRadius: 2
    },
    tipBackgroundView: {
        paddingTop: 40, 
        paddingHorizontal: 15,
        paddingBottom: 30,
        justifyContent:"center"
    },
    tipTitle: {
        marginBottom: 20,
        textAlign: "center",
        color: color['c2'],
        fontSize: font['f8'],
    },
    tipContent:{
        textAlign: "center",
        color:color['c2'],
        fontSize: font['f6'],

    },
    buttonBackgroundView:{  
        width:250,  
        height: 44,  
        backgroundColor: '#fff',  
        alignItems: 'center',  
        justifyContent: 'center',
        borderColor: color['c16'],
        borderTopWidth:0.5,
        borderRadius:4
    },
    buttonText: {
        fontSize:font['f8'],
        color:color['c8']
    }
 })