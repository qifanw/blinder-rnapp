import React, { Component } from 'react';
import {
    View, Text, StyleSheet,TouchableOpacity
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
export class WorkTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
           <View style={styles.subContainer}>
                        {/* <TouchableOpacity style={styles.myItem} activeOpacity={1} onPress={() => this._changeStatus(0)}>
                            <Text style={tag == 1 ? styles.text1 : styles.text2}>项目详情</Text>
                            <View style={tag == 0 ? styles.slide1 : styles.slide2} />
                        </TouchableOpacity>
                        <View style={{ width: 50 }} />
                        <TouchableOpacity style={styles.myItem} activeOpacity={1} onPress={() => this._changeStatus(1)}>
                            <Text style={tag == 0 ? styles.text1 : styles.text2}>上链信息</Text>
                            <View style={tag == 1 ? styles.slide1 : styles.slide2} />
                        </TouchableOpacity> */}
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    subContainer:{
        backgroundColor: "#000000",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        
    }
});