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
            loginCodearr: [],
            loginCode1: "",
            loginCode2: "",
            loginCode3: "",
            verifyCode: ''
        }
        this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this);
    }
    onChangeVerifyCode(text) {
        console.log("登陸--value-" + text)
    }

    handleInputChange(value) {
        let code = value.slice(-1)
        console.log("登陸--value-" + value)
        console.log("登陸--value-" + value.length)
        if (value.length == 1) {
            this.setState({
                loginCode1: code
            })
        } else if (value.length == 2) {
            this.setState({
                loginCode2: code
            })
        }


    }

    render() {
        const { loginCode, loginCodearr, loginCode1, loginCode2 } = this.state
        console.log("登陸--loginCodearr-" + loginCodearr.length)
        console.log("登陸--loginCode2-" + loginCode2)
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

                {/* <View style={styles.inputView}>
                    <View>
                        <TextInput style={styles.input}
                            defaultValue='地址'
                            autoCapitalize="characters"
                            keyboardType="numeric"
                            value={this.state.loginCode}
                            underlineColorAndroid="transparent"
                            editable={true}
                            maxLength={4}
                            // onChangeText={value => this.handleInputChange(value)}
                            onChangeText={(text) => {
                                text = text.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
                                console.log("登录==text=="+text)
                                var code = text.slice(-1)
                                this.setState({ 
                                    loginCode: text,
                                    // loginCodearr:loginCodearr.push(text)
                                 })
                            }
                            }
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputView2}>
                        <Text style={styles.textCode}>{loginCode}</Text>
                        <Text style={styles.textCode}>{loginCode2}</Text>
                    </View>
                </View> */}
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
    input: {
        color: color.c70,
        fontSize: font.f25,
        height: 70,
    },
    inputView2: {
        flexDirection: 'row'
    },
    textCode: {
        color: color.c70,
        fontSize: font.f25,
        height: 70,
        marginLeft: 10,
        borderBottomColor: color.c70,
        borderBottomWidth: 1,
    }
});