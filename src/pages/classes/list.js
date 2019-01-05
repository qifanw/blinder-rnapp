import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image
} from 'react-native';
import { gap, color, font } from '../../common/standard';
export class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [{id:1}, {id:2}, {id:3}, {id:4}]

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
                    <View style={[styles.bgViewStyle, { justifyContent: 'center', width: 65, alignItems: 'center' }]}>
                        <Image  source = {require('./images/classPlaceholder.png')} style={{ marginTop: 5 }} />
                    </View>
                    <View style={[styles.bgViewStyle]}>
                        <Text style={styles.textStyle}>初二一班</Text>
                        <Text style={[styles.textStyle, { fontSize: 12, marginTop: 5 }]}>教师30人 学生60人</Text>
                    </View>
                    {id == 1 ? <TouchableOpacity style={{ width: 71, height: 34, borderRadius: 8, backgroundColor: color.c6, justifyContent: 'center', alignItems: 'center', shadowColor:'#000000',shadowOffset:{width:0,height:3},shadowOpacity:0.16,elevation:4}}>
                        <Text style={{ fontSize: 18, color:color.c1}}>加入</Text>
                    </TouchableOpacity>:<Image source={require('../../components/images/ic_ejjt.png')} style={{ marginLeft: 65 }} />}
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
        width: (Dimensions.get('window').width - 170),
        height: 70,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textStyle: {
        color: color.c3,
        fontSize: 18,
    }
});