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
export class TeacherInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                { id: 0, text: '语文', isClick: false },
                { id: 1, text: '英语', isClick: false },
                { id: 2, text: '地理', isClick: false },
                { id: 3, text: '政治', isClick: false },
                { id: 4, text: '历史', isClick: false },
                { id: 5, text: '其他', isClick: false },
            ],
        };
    }
    clickF(id) {
        let listData = [...this.state.listData];
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].id == id) {
                if (listData[i].isClick) {
                    listData[i].isClick = false
                } else {
                    listData[i].isClick = true
                }
            }
        }
        this.setState({
            listData: listData,
        });

    }
    onClink() {
        let listData = [...this.state.listData];
        let arr = [];
        for (let index = 0; index < listData.length; index++) {
            if (listData[index].isSelected) {
                arr.push(listData[index].id)
            }

        }
        jump("tab")
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.text1}> 完善您的身份信息</Text>
                    <Text style={styles.text2}> 身份信息将会在班级中展示对应的权限哦 </Text>
                    <Image style={styles.Icon} source={require('./images/rn-xiang.png')} />
                    <Text style={styles.text3}> 点击更换头像 </Text>
                </View>
                <Text style={styles.text4}> 您所教授的学科：</Text>
                <View style={styles.FlatListView}>
                    <FlatList
                        data={this.state.listData}
                        renderItem={({ item, index }) => <ItemView  {...item} index={index} length={this.state.listData.length} click={(id) => this.clickF(id)}> </ItemView>}
                        // ListFooterComponent={this.ListFooterComponent.bind(this)}
                        // horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id + ''}
                    />
                </View>
                <View style={styles.itemBtnGroupView} >
                    <RowButton normalStyle={{ backgroundColor: "#54B4F0", borderRadius: 30, }}
                        underlayColor={color.c6}
                        text="加入班级" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
                        onPress={() => this.onClink()} />
                </View>
            </View>
        )
    }
}
class ItemView extends Component {
    constructor(props) {
        super(props);
    }
    //选择 
    itemClick() {
        this.props.click(this.props.id);
    }
    render() {
        const { index, length, text, isClick, id } = this.props;
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => this.itemClick()} >
                <View style={[styles.itemTextV, index + 1 >= length ? {} : { marginRight: 42 }, isClick ? { backgroundColor: "#54B4F0" } : { backgroundColor: "#FFFFFF" }]} >
                    <Text style={[styles.itemText, isClick ? { color: "#FFFFFF" } : { color: "#707070" }]}>{text}</Text>
                </View>
            </TouchableOpacity>

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
    itemContainer: {
        // flex: 1,
        justifyContent: "space-between",
        // alignItems: "center",

    },
    FlatListView: {
        marginLeft: 38,
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemTextV: {
        //    marginRight: 34,
        //   flex: 1,
        marginTop: 22,
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 35,
    },
    itemText: {
        fontSize: 18,
        color: "#707070",

    },
    containerText: {
        alignItems: "center",
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
        marginTop: 100,
        marginRight: 44,
        marginLeft: 44,
        // marginLeft: gap["gap-s"],
        // marginRight: gap["gap-s"],
    },
});