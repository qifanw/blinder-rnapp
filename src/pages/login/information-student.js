import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions,
    SafeAreaView,
    SectionList,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { RowFunc, Dialog, Toast, Loading, RowInput, RowButton } from '../../components';
import { color, font, gap } from '../../common/standard'
import { initRN } from '../../init';
export class StudentInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onClink(){
    let    rowName  = this._rowName.getValue();
    if(rowName == ''){
        Toast.show("请输入你的姓名");
        return;
    }
    let    rowClass  = this._rowClass.getValue();
    if(rowName == ''){
        Toast.show("请输入你的班级邀请码");
        return;
    }
    console.log(rowClass+"==请输入你的姓名=========="+rowName)
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.text1}> 完善您的身份信息</Text>
                    <Text style={styles.text2}> 身份信息将会在班级中展示对应的权限哦 </Text>
                    <Image style={styles.Icon} source={require('./images/ic_bank_bh.png')} />
                    <Text style={styles.text3}> 点击更换头像 </Text>
                    <Text style={styles.itemText}> 您的姓名 </Text>
                    <RowInput ref={c => this._rowName = c} clearShow={false} inputStyle={styles.input} placeholder="请填写真实姓名，不可超过10个字符"  ></RowInput>
                    <Text style={styles.itemText1}> 班级邀请码 </Text>
                    <RowInput ref={c => this._rowClass = c} clearShow={false} inputStyle={styles.input1} placeholder="请输入班主任分配给您的班级邀请码"  ></RowInput>

                </View>
                <View style={styles.itemBtnGroupView} >
                    <RowButton normalStyle={{ backgroundColor: "#707070", borderRadius: 30, }}
                        underlayColor={color.c70}
                        text="加入班级" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
                        onPress={() => this.onClink()} />
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
        backgroundColor: "#FFFFFF",
    },
    containerText: {
        alignItems: "center",
    },
    input: {
        marginTop: 26,
        fontSize: font["f8"],
        color: "#707070",
        flex: 1,
        textAlign: "center",
        borderColor: "#707070",
        borderBottomWidth: 0.5,
        marginLeft: 50,
        marginRight: 50,
    },
    input1: {
        marginTop: 12,
        fontSize: font["f8"],
        color: "#707070",
        flex: 1,
        textAlign: "center",
        borderColor: "#707070",
        borderBottomWidth: 0.5,
        marginLeft: 50,
        marginRight: 50,
    },
    itemText: {
        fontSize: 18,
        color: "#707070",
        marginTop: 50,
    },
    itemText1:{
        fontSize: 18,
        color: "#707070",
        marginTop: 28,
    },
    text1: {
        fontSize: 26,
        color: "#707070",

        marginTop: 38,
    },
    text2: {
        fontSize: 18,
        color: "#707070",
        alignItems: "center",
        marginTop: 8,
    },
    Icon: {
        marginTop: 32,
    },
    text3: {
        fontSize: 12,
        color: "#707070",
        alignItems: "center",
        marginTop: 8,
    },
    text4: {
        fontSize: 18,
        color: "#707070",
        marginTop: 38,
        marginLeft: 32,
    },
    itemBtnGroupView: {
        marginTop: 46,
        marginRight: 44,
        marginLeft: 44,
        // marginLeft: gap["gap-s"],
        // marginRight: gap["gap-s"],
    },
});