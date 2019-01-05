import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView,Image,TouchableOpacity
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { jump, init, refresh,pop } from '../../router'
import { initRN } from '../../init';
import VerifyCode from "./VerifyCodeInput";
export class LoginCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginCode: "",//验证码
            codeText:null
            
        }
        this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this);
    }
    onChangeVerifyCode(text) {
        console.log("登陸--value-" + text)
    }
    componentDidMount() {
      let  phone  =  this.props.phone;
      console.log("登陸--value-" + phone)
      this.setState({
        codeText:"验证码已发送至"+phone

      })
    }
  
    getCode(){

    }
    popR(){
        pop();  
    }
    render() {
        
        return (
            <View style={styles.container}>
            <View style={styles.codeView}>
            <TouchableOpacity  activeOpacity={1} onPress={() => this.popR()}>
            <Image source={require("./images/rn-fan.png")}  />
            </TouchableOpacity>
            <Text  style={styles.textCod}>验证码登录</Text>
            </View>
            
                <Text style={styles.text}>{this.state.codeText}</Text>
                {/* 验证码输入框 */}
                <View style={styles.inputView}>

                    <VerifyCode
                        ref={(ref) => { this.verifyCode = ref; }}
                        verifyCodeLength={4}
                        onChangeText={text => this.onChangeVerifyCode(text)}
                    />

                </View>
                <TouchableOpacity  style={styles.textCodeV} activeOpacity={1} onPress={() => this.getCode()}>
                <Text  style={styles.textCode}>重新发送验证码</Text>
                </TouchableOpacity>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    codeView:{
        flexDirection: 'row',
        marginLeft: 19,
        marginTop: 21,
        alignItems:'center', // 交叉轴中点对齐
    },
    textCod:{
        color: color.c70,
        fontSize: 25,
        marginLeft: 20,
    },
    text: {
        color: color.c70,
        fontSize: font.f4,
        marginLeft: 20,
        marginTop: 62,
    },
    inputView: {
        // flex: 1,
        marginTop: 28,
        // marginLeft: 74,
        // marginRight: 74,
    },
    textCode:{
       
        color: "#2F2F2F",
        fontSize: 14,
        // marginLeft: 20,
        marginTop: 46,
    },
    textCodeV:{
        flex: 1,
       // justifyContent: 'center',
        alignItems:'center', // 交叉轴中点对齐
    }

});