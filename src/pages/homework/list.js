import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { jump, jumpApp, jumpRNApp, refresh } from '../../router';

export class HomeworkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [{}, {}, {}, {}]

        }
    }
    componentDidMount() {

    }
    render() {
        const { dataArr } = this.state
        return (
            <View style={styles.container}>
                <FlatList style={{ marginTop: 15 }}
                    ref={ref => this._list = ref}
                    data={dataArr}
                    renderItem={({ item, index }) => <ListItem {...item} />}
                    keyExtractor={(item, index) => index + ''}
                >
                </FlatList>
                <Text onPress={() => jump('/homework/detail')}> jump to HomeworkDetail </Text>
                <Text onPress={() => jump('/homework/recode')}> jump to audioStemp </Text>
            </View>
        )
    }
}
class ListItem extends Component {

    constructor(props) {
        super(props);
    }
    itemAction() {
        console.log('===========')
    }
    render() {
        const { name, classes, time, id, pic } = this.props
        return (
            <TouchableOpacity style={styles.rowViewStyle} onPress={() => this.itemAction()}>
                <View style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: color.c1,
                    borderRadius: 12
                }}>
                    <View style={[styles.bgViewStyle, {marginLeft:5, width: 65 ,alignItems:'center'}]}>
                        <Image source={require('./images/classPlaceholder.png')} style={{ marginTop:5 }} />
                        <Text style={[styles.textStyle,{fontSize:12,marginTop:5}]}>一班</Text>
                    </View>
                    <View style={[styles.bgViewStyle]}>
                        <Text style={styles.textStyle}>岳阳楼记</Text>
                        <Text style={[styles.textStyle,{fontSize:12,marginTop:5}]}>时间：2018-12-28 11:00</Text>
                    </View>
                    <Image source={require('../../components/images/ic_ejjt.png')} style={{ marginRight: 5 }} />
                </View>
            </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowViewStyle: {
        marginTop: 10,
        marginLeft: 10,
        height: 74,
        marginRight: 10,
    },
    bgViewStyle: {
        width: (Dimensions.get('window').width - 110),
        height: 70,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textStyle: {
        color: color.c3,
        fontSize: 18,
    }
});