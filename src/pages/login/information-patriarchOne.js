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
export class PatriarchOneInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onClink() {
        jump('/login/PatriarchTwoInformation')

    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.text1}> 完善您的身份信息</Text>
                    {/* <Image style={styles.Icon} source={require('./images/ic_tx_xq.png')} /> */}
                    <Text style={styles.text3}> 点击更换头像 </Text>
                </View>
                <View style={styles.containerText} >

                    <View style={styles.textew}>
                        <Text style={styles.text4}> 该账号已为学生 </Text>
                        <Text style={styles.text6}> 李晓沫 </Text>
                        <Text style={styles.text4}>  的账号</Text>
                    </View>
                    <Text style={styles.text5}> 是否与该账号进行关联绑定 </Text>
                </View>



                <View style={styles.itemBtnGroupView} >
                    <RowButton normalStyle={{ backgroundColor: "#707070", borderRadius: 30, }}
                        underlayColor={color.c70}
                        text="立即关联" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
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
    textew: {
        flexDirection: "row",
    },
    itemText: {
        fontSize: 18,
        color: "#707070",
        marginTop: 50,
    },
    itemText1: {
        fontSize: 18,
        color: "#707070",
        marginTop: 28,
    },
    text1: {
        fontSize: 26,
        color: "#707070",

        marginTop: 54,
    },
    text2: {
        fontSize: 18,
        color: "#707070",
        alignItems: "center",
        marginTop: 8,
    },
    Icon: {
        marginTop: 70,
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
        marginTop: 76,
        //  marginLeft: 32,
    },
    text5: {
        fontSize: 18,
        color: "#707070",
        // marginTop: 76,
        //  marginLeft: 32,
        //  alignItems: "center"
    },
    text6: {
        fontSize: 18,
        color: "#707070",
        marginTop: 76,
        fontWeight: 'bold'
    },
    itemBtnGroupView: {
        marginTop: 46,
        marginRight: 44,
        marginLeft: 44,
        // marginLeft: gap["gap-s"],
        // marginRight: gap["gap-s"],
    },
});