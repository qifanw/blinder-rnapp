import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Dimensions,FlatList,Image
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
import { color, font, gap } from '../../common/standard'
import { RowFunc, Dialog, Toast, Loading, RowInput, RowButton } from '../../components';

export class PatriarchTwoInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                { id: 0, text: '爸爸', image:require('./images/ic_tx_xq.png'), isClick: false },
                { id: 1, text: '妈妈',image:require('./images/ic_tx_xq.png'), isClick: false },
                { id: 2, text: '姥姥（外婆）',image:require('./images/ic_tx_xq.png'), isClick: false },
                { id: 3, text: '姥爷（外公）',image:require('./images/ic_tx_xq.png'), isClick: false },
                { id: 4, text: '爷爷',image:require('./images/ic_tx_xq.png'), isClick: false },
                { id: 5, text: '奶奶', image:require('./images/ic_tx_xq.png'),isClick: false },
                { id: 6, text: '其他监护人',image:require('./images/ic_tx_xq.png'), isClick: false },
            ],
        };
    }
    clickF(id) {

    }
    onClink(){

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.preview}>
                    <View style={styles.capture}>
                        <Text style={styles.text1}>我是 </Text>
                        <Text style={styles.text2}>李晓沫</Text>
                        <Text style={styles.text1}> 的</Text>
                    </View>
                    <Text style={styles.text3}>选择家长身份</Text>
                </View>
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
                    <RowButton normalStyle={{ backgroundColor: "#707070", borderRadius: 30, }}
                        underlayColor={color.c70}
                        text="进入眼罩" textStyle={{ color: "#FFFFFF", fontSize: 20, }}
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
        const { index, length, text, isClick, id ,image} = this.props;
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => this.itemClick()} >
                <View style={[styles.itemTextV, index + 1 >= length ? {} : { marginRight: 30 }]} >
                <Image style={styles.imgStyle} source={image}  ></Image>
                    <Text style={[styles.itemText]}>{text}</Text>
                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 
        backgroundColor: "#FFFFFF",
    },
    preview: {
        // flex: 1,
        // justifyContent: 'flex-end',
        marginTop: 12,
        alignItems: 'center'
    },
    capture: {
        flexDirection: 'row',
    },
    itemContainer:{
        marginTop: 12,
    },
    text1: {
        fontSize: 26,
        color: "#707070",
    },
    text2: {
        fontSize: 26,
        color: "#707070",
        fontWeight: 'bold'
    },
    text3: {
        fontSize: 20,
        color: "#9B9B9B",
        marginTop: 12,
    },
    itemTextV:{
        alignItems: 'center'
    },
    itemText :{
        fontSize: 16,
        color: "#515151",  
    },
    FlatListView:{
        marginTop: 40,
        alignItems: 'center',
        marginLeft: 38,
    },
    itemBtnGroupView:{
        marginTop: 26,
        marginRight: 40,
        marginLeft: 40,
    }

});