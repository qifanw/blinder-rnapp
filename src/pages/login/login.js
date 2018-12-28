import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
import { getItem, setItem } from '../../common/local-store';
import { RowFunc, Dialog, Toast, Loading, RowInput, RowButton } from '../../components';
import { color, font, gap } from '../../common/standard'
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            clearShow: true
        }
    }
    componentDidMount() {

    }
    handleClear() {
        this.handleInputChange("")
    }
    handleInputChange(value) {
        let state = { phone: value, clearShow: true }

        value == "" && (state.clearShow = true)

        this.setState(state);


    }
    onFocus() {
        this.state.phone && this.setState({ clearShow: true });
    }

    onClink() {
        let phone = this.state.phone;
        if (phone == null) {
            Toast.show("请输入您的手机号")
            return;
        } else if (phone.length != 11) {

            Toast.show("请输入正确的手机号")
            return;
        }
        else {

            // jump('/login/login-code', { phone: this.state.phone })
            jump('/login/TeacherInformation')
        }

    }
    ontouchcancel() {

        setItem("userPackage", 1)
        jump("tab")
    }
    ontouchc() {
        getItem("userPackage").then(result => {
            console.log("登录---------getItem------------------" + result)
            return result;
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.Icon} source={require('./images/ic_bank_bh.png')} />
                <Image style={styles.imgIcon} source={require('./images/ic_bank_bh.png')} />
                <View style={styles.viewPhone} >
                    <Image source={require('./images/ic_bank_bh.png')} />
                    {/* <RowInput  maxLength={11} clearShow ={false} ref={c => this._rowInput3 = c} inputStyle={styles.input} placeholder="请输入您的手机号"  keyboardType="numeric" ></RowInput> */}
                    <TextInput style={styles.input}
                        placeholder="请输入您的手机号"
                        autoCapitalize="characters"
                        placeholderTextColor="#707070"
                        keyboardType={'numeric'}
                        editable={true}
                        value={this.state.phone}
                        underlineColorAndroid="transparent"
                        maxLength={11}
                        onFocus={() => this.onFocus()}
                        onChangeText={value => this.handleInputChange(value)}
                    ></TextInput>
                    {this.state.clearShow && <TouchableOpacity activeOpacity={1} style={styles.labelClear} onPress={() => this.handleClear()}>
                        <Image source={require("./images/ic_srkch.png")} />
                    </TouchableOpacity>}

                </View>
                <Text style={styles.text}>若该手机号尚未注册，我们会自动为您注册</Text>
                <View style={styles.itemBtnGroupView} >
                    <RowButton normalStyle={{ backgroundColor: "#707070", borderRadius: 30, }}
                    underlayColor={color.c70}
                        text="下一步" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
                        onPress={() => this.onClink()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    Icon: {
        marginTop: 108,
        marginLeft: 42,
    },
    imgIcon: {
        marginTop: 24,
        marginLeft: 42,
    },
    viewPhone: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 94,
        marginLeft: 42,
        marginRight: 34,
        borderColor: "#707070",
        borderBottomWidth: 0.5,

    },
    input: {
        fontSize: font["f8"],
        color: "#707070",
        flex: 1,
        textAlign: "center"
    },
    labelClear: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        color: "#707070",
        marginTop: 4,
        marginLeft: 46,

    },
    itemBtnGroupView: {
        marginTop: 86,
        marginRight: 44,
        marginLeft: 44,
        //    marginBottom: 60

    },
    disabledStyle: {
        borderRadius: 15,
    }
});