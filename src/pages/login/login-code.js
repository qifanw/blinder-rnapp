import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
import VerifyCode from "./VerifyCodeInput";
export class LoginCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginCode: "",//验证码
            
        }
        this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this);
    }
    onChangeVerifyCode(text) {
        console.log("登陸--value-" + text)
    }

  

    render() {
        
        return (
            <View style={styles.container}>
                <Text style={styles.text}>验证码已发送至1234567890</Text>
                {/* 验证码输入框 */}
                <View style={styles.inputView}>

                    <VerifyCode
                        ref={(ref) => { this.verifyCode = ref; }}
                        verifyCodeLength={4}
                        onChangeText={text => this.onChangeVerifyCode(text)}
                    />

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        color: color.c70,
        fontSize: font.f4,
        marginLeft: 20,
        marginTop: 62,
    },
    inputView: {
        flex: 1,
        marginTop: 28,
        // marginLeft: 74,
        // marginRight: 74,
    },
  
});