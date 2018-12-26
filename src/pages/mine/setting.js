import React, { Component } from 'react';
import {
    View, Text, StyleSheet,Image
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { gap, color, font } from '../../common/standard';
import { RowFunc, Dialog, Toast, Loading } from '../../components';
import { initRN } from '../../init';
export class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Viewhead}>
                    {/* <RowFunc hasRightArrow={false} sourceRightStyles={styles.sourceRightStyles} sourceRight={require('./images/ic_tx_xq.png')} text="更换头像" onPress={() => jump('/mine/setting')} /> */}
             <Text  style={styles.sourceRightStyles}>更换头像</Text>
             <Image style={styles.rightIcon} source={require('./images/ic_tx_xq.png')} />
                </View>
                <View style={styles.Viewstyles}>
                    <RowFunc textStyle={styles.descstyle} hasRightArrow={false} containerStyle={styles.containerStyle} desc="12345678" descStyle={styles.descstyle} text="手机号" onPress={() => jump('/mine/setting')} />
                    <RowFunc textStyle={styles.descstyle} hasRightArrow={false} containerStyle={styles.containerStyle}  text="手机号" onPress={() => jump('/mine/setting')} />
                    <RowFunc textStyle={styles.descstyle} hasBottomBorder={false} containerStyle={styles.containerStyle}  text="清除缓存" onPress={() => jump('/mine/setting')} />
                </View>
                <Text style={styles.logOut} onPress={() => jump('/class/administration')}>退出当前账号</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Viewhead: {
        marginTop: 16,
        backgroundColor: "#F0F0F0",
        height: 76,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingLeft: 20,
        // paddingRight: 24,
        // paddingTob:10,

        // paddingTob: 10,
        // paddingBottom:10,

    },
    Viewstyles: {
        marginTop: 14,
        backgroundColor: "#F0F0F0",
        paddingLeft: 20,
        paddingRight: 20,

    },
    sourceRightStyles: {
        color: "#6F6F6F",
        fontSize: font.f9,
        marginLeft: 20,
    },
    rightIcon:{
        // paddingTob: 10,
        // paddingBottom:10,
        marginRight: 15,
    },
    descstyle:{
        color: "#6F6F6F",
        fontSize: font.f8,
    },
    containerStyle:{
        backgroundColor: "#F0F0F0",
    },
    logOut :{
        marginTop:34,
        color: "#FF0014",
        fontSize: font.f8,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        backgroundColor: "#F0F0F0",
        height: 52,
    }

    
});