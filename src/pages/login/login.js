import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity,ImageBackground 
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
import { getItem, setItem } from '../../common/local-store';
import { RowFunc, Dialog, Toast, Loading, RowInput, RowButton } from '../../components';
import { color, font, gap } from '../../common/standard'

import LocalStorage from '../../common/localstorage'
const instance = LocalStorage.getInstance();

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            clearShow: true
        }
    }
    componentDidMount() {
        instance.setItem("123","都是圣诞节")
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
            instance.setItem("userPackage","hooo")
         //   setItem("userPackage", 1)
        //    jump("tab")
            // jump('/login/login-code', { phone: this.state.phone })
            jump('/login/TeacherInformation')
        }

    }
    ontouchcancel() {

        setItem("userPackage", 12)
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
            <ImageBackground  style={styles.ImgItemSty}  source={require('./images/rn-bei.png')} >
            <Image style={styles.Icon} source={require('./images/rn-huan.png')} />
            <View style={styles.imgIconView}>
            <Image style={styles.imgIcon} source={require('./images/rn-tou.png')} />
            </View>
            </ImageBackground>
            <View style={styles.imgIconView}>
               <Image style={styles.imgIcon} source={require('./images/rn-yan.png')} />
            </View>
                <View style={styles.viewPhone} >
                    <Image source={require('./images/rn-shou.png')} />
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
                        <Image source={require("./images/rn-cha.png")} />
                    </TouchableOpacity>}

                </View>
                <View tyle={styles.imgIconView}>
                <Text style={styles.text}>若该手机号尚未注册，我们会自动为您注册</Text>
                </View>
              
                <View style={styles.itemBtnGroupView} >
                    <RowButton normalStyle={{ backgroundColor: "#54B4F0", borderRadius: 30, }}
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
        marginTop: 92,
        marginLeft: 41,
    },
    imgIcon: {
      //  marginTop: 24,
      //  marginLeft: 107,
    },
    imgIconView:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewPhone: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 36,
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
       // marginTop: 4,
       marginLeft: 46,

    },
    itemBtnGroupView: {
        marginTop: 61,
        marginRight: 35,
        marginLeft: 35,
        //    marginBottom: 60

    },
    disabledStyle: {
        borderRadius: 15,
    },
    ImgItemSty:{
        width: width,
    }
});