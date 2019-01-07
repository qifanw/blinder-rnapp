import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, TextInput,ScrollView
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { RowFunc, Dialog, Toast, Loading, DialogInvite,RowButton } from '../../components';
import { jump, jumpApp, jumpRNApp, refresh } from '../../router';
import { service, logger } from '../../services';
import Picker from 'react-native-picker';
import DatePicker from 'react-native-datepicker';
export class ReleaseHomework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            datetime: '',
        }
    }
    componentDidMount() {
        
    }
    onClink(){

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
                    <Text style={styles.textStyle}>设置最晚提交时间:</Text>
                        <DatePicker
                            style={{width:200}}
                            date={this.state.datetime}
                            mode="datetime"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="确定"
                            cancelBtnText="取消"
                            showIcon={true}
                            iconSource={require('./images/calendar.png')}
                            onDateChange={(datetime) => { this.setState({ datetime: datetime }); }}
                        />
                </View>
                <View style={styles.teachViewStyle}>
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ fontSize: 14, color: color.c5 }}>输入背诵文本</Text>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, height: 1, backgroundColor: color.c7 }}></View>
                        <TextInput style={{ fontSize: 12, color: color.c3, margin: 15, height: 144, textAlignVertical: 'top' }} multiline={true} placeholder='请手动输入/复制粘贴背诵文章内容'></TextInput>
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