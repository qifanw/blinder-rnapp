import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, TextInput,ScrollView
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { RowFunc, Dialog, Toast, Loading, DialogInvite,RowButton } from '../../components';
import { jump, jumpApp, jumpRNApp, refresh } from '../../router';
import { service, logger } from '../../services';
import Picker from 'react-native-picker';
export class ReleaseHomework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            finishTime:'',
        }
    }
    componentDidMount() {
        
    }
    onClink(){

    }
    DateToStr(dateArry) {

        let title = dateArry.toString();
        let reg = /[\u4E00-\u9FA5]/g;
        let result = title.replace(reg, '').split(',');

        let [year, month, day] = result;
        if (day.length <= 1) {

            day = "0" + day;
        }

        if (month.length <= 1) {

            month = "0" + month;
        }

        let last = [year, month, day].join('/');

        return last;
    }
    _createDateData() {
        let date = [];
        for (let i = 2019; i < 2100; i++) {
            let month = [];
            for (let j = 1; j < 13; j++) {
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k + '');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29 + '');
                    }
                }
                else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k + '');
                    }
                }
                else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k + '');
                    }
                }
                let _month = {};
                _month[j + ''] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + ''] = month;
            date.push(_date);
        }
        return date;
    }
    showDatePicker(){
        var date = new Date();
        var year = date.getFullYear() + '';
        var month = date.getMonth() + 1 + "";
        var date = date.getDate() + '';
        Picker.init({
            pickerData: this._createDateData(),
            pickerFontColor: [255, 144, 0, 1],
            pickerConfirmBtnText: '确定',
            pickerToolBarFontSize: 16,
            pickerRowHeight: 30,
            pickerCancelBtnText: '取消',
            pickerFontSize: 20,
            pickerBg: [255, 255, 255, 255],
            pickerToolBarBg: [255, 255, 255, 255],
            pickerTitleText: '选择时间',
            selectedValue: [year, month, date],
            pickerFontFamily: '微软雅黑", "宋体", Arial, Helvetica, sans-serif',
            pickerTextEllipsisLen: 12,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let pickedValueStr = this.DateToStr(pickedValue);
                this.setState({
                    finishTime:pickedValueStr,
                });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                this.setState({
                    
                });
            },
        });
        Picker.show();
    }
    render() {
        const { dataArr,finishTime } = this.state
        return (
            <View style={styles.container}>
            <ScrollView bounces={false}>
                <View style={{ marginTop: 15, marginLeft: 10, marginRight: 10, height: 50, backgroundColor: color.c1, justifyContent: 'center', borderRadius: 12 }}>
                    <TextInput style={{ marginLeft: 15 }} placeholder='作业标题：请输入作业题目' placeholderTextColor={color.c5}></TextInput>
                </View>
                <View style={styles.teachViewStyle}>
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ fontSize: 14, color: color.c5 }}>选择班级</Text>
                    </View>
                    <FlatList style={styles.FlatListStyle}
                        ref={ref => this._list = ref}
                        data={dataArr}
                        numColumns={5}
                        renderItem={({ item, index }) => <ListItem {...item} />}
                        keyExtractor={(item, index) => index + ''}
                    >
                    </FlatList>
                </View>
                <View style={{ marginTop: 15, marginLeft: 10, marginRight: 10, height: 50, backgroundColor: color.c1, alignItems: 'center', borderRadius: 12,flexDirection:'row',justifyContent:'space-around' }}>
                    <Text style={styles.textStyle}>{finishTime==='' ? '设置最晚提交时间：2019/12/29 14:00' :'设置最晚提交时间：'+finishTime} </Text>
                    <TouchableOpacity onPress={() => this.showDatePicker()}>
                        <Image  source={require('./images/calendar.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.teachViewStyle}>
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ fontSize: 14, color: color.c5 }}>输入背诵文本</Text>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, height: 1, backgroundColor: color.c7 }}></View>
                    <TextInput style = {{fontSize: 12,color:color.c3,margin:15,height:144,textAlignVertical:'top'}} placeholder='请手动输入/复制粘贴背诵文章内容'></TextInput>
                </View>
                <RowButton normalStyle={{ backgroundColor: "#54B4F0", borderRadius: 30,marginTop:10,marginLeft:80,marginRight:80}}
                        underlayColor={color.c70}
                        text="发布作业" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
                        onPress={() => this.onClink()} />
            </ScrollView>
            </View>
        )
    }
}
class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }
    itemAction() {
        this.setState({
            selected: !this.state.selected
        })
    }
    render() {
        const { name, classes, time, id, pic } = this.props
        return (
            this.state.selected === false ? <TouchableOpacity style={[styles.sectionViewStyle]} onPress={() => this.itemAction()}>
                <Image source={require('../homework/images/classPlaceholder.png')} style={{ marginTop: 18 }} />
                <Text style={{ fontSize: 10, color: color.c5,marginTop:5 }}>初一二班</Text>
            </TouchableOpacity> :
                <TouchableOpacity style={[styles.sectionViewStyle, { backgroundColor: color.c6 }]} onPress={() => this.itemAction()}>
                    <Image source={require('./images/selected.png')} style={{ marginLeft: (Dimensions.get('window').width - 100) / 7}} />
                    <Image source={require('../homework/images/classPlaceholder.png')} />
                    <Text style={{ fontSize: 10, color: color.c5, marginTop: 5 }}>初一二班</Text>
                </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    teachViewStyle: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: color.c1
    },
    FlatListStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    sectionViewStyle: {
        width: (Dimensions.get('window').width - 100) / 5,
        margin: 5,
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 8,
    },
    textStyle:{
        fontSize:12,
        color:color.c5,
    }
})