import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ScrollView,
} from 'react-native';
import { color, font } from '../../common/standard'
import { jump, init, refresh } from '../../router'
export class ClassMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 1 }, { id: 2 }]

        }
    }
    componentDidMount() {

    }
    render() {
        const { dataArr } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.teachViewStyle}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={{ fontSize: 14, color: color.c3 }}>老师成员</Text>
                            <Text style={{ fontSize: 14, color: color.c4 }}>共6位教员</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginRight: 10, height: 1, backgroundColor: color.c7 }}></View>
                        <FlatList style={styles.FlatListStyle}
                            ref={ref => this._list = ref}
                            data={dataArr}
                            numColumns={5}
                            renderItem={({ item, index }) => <ListItem {...item} />}
                            keyExtractor={(item, index) => index + ''}
                        >
                        </FlatList>
                    </View>
                    <View style={styles.teachViewStyle}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={{ fontSize: 14, color: color.c3 }}>学生成员</Text>
                            <Text style={{ fontSize: 14, color: color.c4 }}>共6位教员</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginRight: 10, height: 1, backgroundColor: color.c7 }}></View>
                        <FlatList style={styles.FlatListStyle}
                            ref={ref => this._list = ref}
                            data={dataArr}
                            numColumns={5}
                            renderItem={({ item, index }) => <ListItem {...item} />}
                            keyExtractor={(item, index) => index + ''}
                        >
                        </FlatList>
                    </View>
                </ScrollView>
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
            <TouchableOpacity style={styles.sectionViewStyle} onPress={() => this.itemAction()}>
                <Image source={require('./images/headImage.png')} style={{ width: 26, height: 26, margin: 5 }} />
                <Text style={{ fontSize: 10, color: color.c3 }}>语文 欧阳锋</Text>
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
        height: 60,
        flexDirection: 'column',
        alignItems: 'center',
    }
});