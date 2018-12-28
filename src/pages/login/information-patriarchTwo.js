import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';

export class PatriarchTwoInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>第三方第三方第三个 </Text>    
                  </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});