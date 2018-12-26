import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { RowFunc, Dialog, Toast, Loading } from '../../components';
import { gap, color, font } from '../../common/standard';
import { initRN } from '../../init';
export class ClassAdministration extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.view} activeOpacity={1}  onPress={() => jump('/login/login-code')} >
                    <Image style={styles.icon} source={require('./images/ic_zzjg.png')} />
                    <View style={styles.textView}>
                        <Text style={styles.text}>班级名称</Text>
                        <Text style={styles.desc}>初二一班</Text>
                    </View>
                    <Image style={styles.rightIcon} source={require('./images/ic_tjk.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.view} activeOpacity={1}  onPress={() => jump('/login/login-code')} >
                    <Image style={styles.icon} source={require('./images/ic_zzjg.png')} />
                    <View style={styles.textView}>
                        <Text style={styles.text}>成员移除</Text>
                        {/* <Text style={styles.desc}>初二一班</Text> */}
                    </View>
                    <Image style={styles.rightIcon} source={require('./images/ic_tjk.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.view} activeOpacity={1}  onPress={() => jump('/login/login-code')} >
                    <Image style={styles.icon} source={require('./images/ic_zzjg.png')} />
                    <View style={styles.textView}>
                        <Text style={styles.text}>管理权转让</Text>
                        {/* <Text style={styles.desc}>初二一班</Text> */}
                    </View>
                    <Image style={styles.rightIcon} source={require('./images/ic_tjk.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.view} activeOpacity={1}  onPress={() => jump('/login/login-code')}>
                    <Image style={styles.icon} source={require('./images/ic_zzjg.png')} />
                    <View style={styles.textView}>
                        <Text style={styles.text}>解散班级</Text>
                        <Text style={styles.dissolvetext}  >解散班级</Text>
                    </View>
                    {/* <Image style={styles.rightIcon} source={require('./images/ic_tjk.png')} /> */}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 100,
        borderRadius: 12,
        backgroundColor: color.c97,
        marginTop: 14,
        marginLeft: 12,
        marginRight: 12,

    },
    textView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    text: {
        fontSize: font["f9"],
        color: color["c1"]
    },
    dissolvetext:{
        
        borderRadius: 8,
        borderColor: "#FF0000",
        borderWidth: 1,
        fontSize: font["f7"],
        color: "#ED5E58",
        marginRight: 16,
        padding :4
    },
    desc: {
        fontSize: font["f9"],
        color: color["c1"],
        marginLeft: 30,
        marginRight: 0
    },
    rightIcon: {
        marginLeft: 10
    }
});